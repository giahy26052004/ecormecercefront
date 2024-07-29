import styled from "styled-components";

import Center from "./center";
import ProductGrid from "./productGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
`;
function NewProduct({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid products={newProducts} />
    </Center>
  );
}

export default NewProduct;
