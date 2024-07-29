import styled from "styled-components";
import Button from "./button";
import CartIcon from "./icons/cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cartcontext";
const ProductWrapper = styled.div``;
const WhileBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  color: inherit;
  text-decoration: none;
  font-size: 0.9rem;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: right;
  margin-right: 10px;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    text-align: left;
    margin-right: 5px;
  }
`;
export default function ProductBox({ _id, title, description, price, images }) {
  const url = "product/" + _id;
  const { addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhileBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhileBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            block="true"
            onClick={() => addProduct(_id)}
            primary="true"
            outline="true"
          >
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
