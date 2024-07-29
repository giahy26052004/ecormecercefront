import styled from "styled-components";
import Button from "./button";
import { useEffect, useState } from "react";
import Spinner, { RingLoaderIcon } from "./spinner";
import CountdownTimer from "./countdownTimer";

const ModalContainer = styled.div`
  display: ${(props) => (props.show === "true" ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #00183b;
  width: 400px;
  display: flex;
  color: #fff;
  padding: 0 20px;
  align-items: center;
  justify-content: center;


  margin: 5% auto;

  margin-top: 120px;
  border: 1px solid #888;
`;

const ImageContent = styled.div`
  margin-bottom: 20px;
  span {
    line-height: 40px;
    margin-left: 40px;
    font-family: sans-serif;
    font-weight: 700;
  }

  text-align: center;
`;
const Tilte = styled.div`
  font-size: 1rem;

  font-weight: 600;
  font-family: sans-serif;
  margin-bottom: 4px;
  text-align: center;
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
const ImageStyled = styled.img`
  width: 16rem;
  height: 16rem;
  padding-left: 2.5rem;
  @media screen and (min-width: 768px) {
    width: 20rem;
    height: 20rem;
  }
`;

const CloseButton = styled.span`
  color: #fff;
  float: right;
  font-size: 28px;
  font-weight: bold;

  margin-right: 20px;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
const CloseWrapper = styled.div`
  margin-bottom: 470px;
  width: 100%;
`;
const CloseButtonSucess = styled.span`
  color: #fff;
  font-size: 28px;
  margin-bottom: 270px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    opacity: 0.4;
    cursor: pointer;
  }
`;

const WrapperInfo = styled.div`
  width: 100%;
`;
const WrapperTitle = styled.div`
  width: 100%;
  margin-left: 20px;
  padding: 10px 0;
`;
const SpinnerStyled = styled.div`
  margin-bottom: -50px;
  margin-left: -1.5px;
  @media screen and (min-width: 768px) {
    margin-bottom: -20px;
    margin-left: -1.5px;
  }
`;
const WrapperSuccess = styled.div`
  height: 20rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;
const TilteSuccess = styled.span`
  font-size: 2rem;
  font-weight: 700;
  font-family: sans-serif;
  margin-bottom: 4px;
  text-align: center;
`;
const RingLoaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;

`;

export const Modal = ({
  showModal,
  handleClose,
  paymentInfo,
  MY_BANK,
  setShowModal,
  submitForm,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const NDCK = paymentInfo.name + Date.now().toString().slice(-6);
  const handleCloseSuccess = () => {
    submitForm();
    setShowModal(false);
  };
  async function checkPaid(price, descrition, idSetInCheckPay) {
    if (isSuccess) {
      return;
    } else {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbycseqrT8DrVp5DpIig-zOs__YJ8xKn8-tAIaQw6nchkRYpwdZ4qof_JexJ0PnEmg5U/exec"
        );
        const data = await response.json();
        const lastPaid = data.data[data.data.length - 1];
        const lastPrice = lastPaid["Giá trị"];
        const lastContent = lastPaid["Mô tả"];
        if (lastPrice >= price && lastPrice === descrition) {
          setIsSuccess(true);
          clearInterval(idSetInCheckPay);
        } else {
          setIsSuccess(false);
          console.log(descrition);
        }
      } catch (error) {
        alert("Error checking payment:", error);
      }
    }
  }
  const paidPrice = paymentInfo.quantity;
  let QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact.png?amount=${paidPrice}&addInfo=${NDCK}`;
  useEffect(() => {
    let idSetInCheckPay;
    if (showModal) {
      const timeoutId = setTimeout(() => {
        idSetInCheckPay = setInterval(() => {
          checkPaid(paidPrice, paymentInfo.quantity, idSetInCheckPay);
        }, 2000);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
        if (idSetInCheckPay) {
          clearInterval(idSetInCheckPay);
        }
      };
    }
  }, [showModal, isSuccess]);

  return (
    <ModalContainer show={showModal.toString()}>
      <ModalContent>
        {!isSuccess ? (
          <>
            <WrapperInfo>
              <ImageContent>
                <span>Quét mã để thanh toán </span>
                <ImageStyled src={QR} />
              </ImageContent>
              <WrapperTitle>
                <Tilte>
                  Nội dung chuyển khoản: <span>{NDCK}</span>{" "}
                </Tilte>
                <Tilte>
                  Số tiền: <span>{`${paymentInfo.quantity}`}</span>{" "}
                </Tilte>
              </WrapperTitle>

              <CountdownTimer
                submitForm={submitForm}
                initialTime={600}
                setShowModal={setShowModal}
                showModal={showModal}
              />
              <SpinnerStyled>
                <Spinner />
              </SpinnerStyled>
            </WrapperInfo>{" "}
            <CloseWrapper>
              <CloseButton onClick={handleClose}>&times;</CloseButton>
            </CloseWrapper>
          </>
        ) : (
          <>
            <WrapperSuccess>
              {" "}
              <TilteSuccess>
                <RingLoaderStyled>
                  <RingLoaderIcon />
                </RingLoaderStyled>
                <CountdownTimer
                  submitForm={submitForm}
                  initialTime={5}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  title="Your order has been successfully paid"
                />{" "}
              </TilteSuccess>
              <CloseButtonSucess onClick={handleCloseSuccess}>
                <span>&times;</span>
              </CloseButtonSucess>
            </WrapperSuccess>
          </>
        )}
      </ModalContent>
    </ModalContainer>
  );
};
