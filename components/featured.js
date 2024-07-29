import styled from "styled-components";
import Center from "./center";
import Button from "./button";
import ButtonLink from "./buttonlink";
import CartIcon from "./icons/cart";
import { useContext } from "react";
import { CartContext } from "./cartcontext";
import Slideshow from "./slideshow";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 1;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
function Feature({ product, image }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={"/products/" + product._id}
                  outline="true"
                  while="true"
                  size="l"
                >
                  Read more
                </ButtonLink>
                <Button while="true" onClick={addFeaturedToCart} size="l">
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <Slideshow images={image} />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}

export default Feature;
