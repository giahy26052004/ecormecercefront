import Button from "@/components/button";
import { CartContext } from "@/components/cartcontext";
import Center from "@/components/center";
import Header from "@/components/header";
import CartIcon from "@/components/icons/cart";
import ProductImage from "@/components/productImages";
import Title from "@/components/title";
import WhileBox from "@/components/whileBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { useContext } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  if (!product) return;

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <ProductImage images={product.images} />
          <div>
            <Title>{product?.title || ""}</Title>

            <p>{product?.description || ""}</p>

            <PriceRow>
              <Price> ${product.price}</Price>
              <div>
                <Button
                  primary={true}
                  onClick={() => {
                    addProduct(product._id);
                  }}
                >
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColumnWrapper>
      </Center>
    </>
  );
}

export default ProductPage;
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
