import React, { useState } from "react";
import styled from "styled-components";

const SlideshowContainer = styled.div`
  max-width: 500px;
  margin: auto;
  position: static;
  @media screen and (min-width: 768px) {
    position: relative;
  }
`;

const Slide = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 10px 30px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 34%;
  left: 90px;
  @media screen and (min-width: 768px) {
    top: 50%;
    left: -5px;
  }
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1;
`;

const NextButton = styled.button`
  position: absolute;
  top: 34%;
  @media screen and (min-width: 768px) {
    top: 50%;
    right: -5px;
  }
  z-index: 1;
  right: 90px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
`;

const DotsContainer = styled.div`
  text-align: center;
  padding: 10px;
`;

const Dot = styled.span`
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: ${(props) => (props.active ? "#717171" : "#bbb")};
  border-radius: 50%;
  display: inline-block;
`;

const Slideshow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <SlideshowContainer>
      {images.map((image, index) => (
        <Slide key={index} active={index === currentSlide}>
          <Image src={image} alt={`Slide ${index}`} />
        </Slide>
      ))}
      <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
      <NextButton onClick={nextSlide}>&#10095;</NextButton>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </SlideshowContainer>
  );
};

export default Slideshow;
