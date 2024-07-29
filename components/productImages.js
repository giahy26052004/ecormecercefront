import { useState } from "react";
import styled from "styled-components";
import WhileBox from "./whileBox";
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
const WrapperImage = styled.div`
text-align: center;
  box-shadow: 2px 4px 13px rgba(0, 0, 0, 0.01);
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 20px;
  justify-content: center;

  padding-bottom: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid ${(props) => (props.active ? "#aaa" : "tranparent")};
  display: flex;
  align-items: center;
  width: 60px;
  margin-top: 10px;
  padding: 1px;
  border-radius: 6px;
  box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
function ProductImage({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  
  return (
    <WhileBox>
      <WrapperImage>
        <BigImage src={activeImage} />
      </WrapperImage>
      <ImageButtons>
        {images.map((image, index) => {
          return (
            <ImageButton
              key={index}
              active={image === activeImage}
              onClick={() => setActiveImage(image)}
            >
              <Image src={image} alt="" />
            </ImageButton>
          );
        })}
      </ImageButtons>
    </WhileBox>
  );
}

export default ProductImage;
