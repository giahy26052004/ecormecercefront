import styled from "styled-components";
import ProductBox from "./productBox";

const StyledProductsGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
  }

`;
const CategoryNameStyled = styled.h2`
  font-weight: 500;
  width: 100%;
  margin: 30px;
  span {
    border-bottom: 2px solid #5b626e;
  }
`;
const WrapperCategory = styled.div``;
export default function CategoryGrid({ products, categories }) {
  console.log(categories, products);
  let countProduct = 0;
  return (
    <>
      {categories.map((category, index) => {
        products.map((product, index) => {
          if (category._id === product.category) {
            countProduct = 1;
          }
        });
        return (
          <WrapperCategory key={index}>
            {countProduct === 1 && (
              <CategoryNameStyled>
                <span>{category.name}</span>
              </CategoryNameStyled>
            )}

            <StyledProductsGrid>
              {products?.length > 0 &&
                products.map((product, index) => {
                  if (category._id === product.category) {
                    return (
                      <div key={index}>
                        <ProductBox key={index} {...product} />
                      </div>
                    );
                  }
                })}
            </StyledProductsGrid>
          </WrapperCategory>
        );
      })}
    </>
  );
}
