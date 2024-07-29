import { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.1rem;
  padding: 10px;
  margin-left: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 1.5rem;
    margin: 18px;
  }
`;
export default function CountdownTimer({
  title,
  initialTime,
  setShowModal,
  showModal,
  submitForm,
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (showModal) {
      setTimeLeft(initialTime); // Reset timeLeft khi modal được mở lại
    }
  }, [showModal, initialTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowModal(false);
      submitForm();
      // Ẩn modal khi thời gian còn lại là 0
      return;
    }

    // Thiết lập interval để giảm thời gian mỗi giây
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup interval khi component unmount hoặc timeLeft thay đổi
    return () => clearInterval(intervalId);
  }, [timeLeft, setShowModal]);

  // Chuyển đổi thời gian còn lại thành định dạng phút:giây
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Wrapper>
      <Title>{title ? title : "Đang chờ thanh toán"}</Title>
      <h2>{formatTime(timeLeft)}</h2>
    </Wrapper>
  );
}
