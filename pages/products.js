import Center from "@/components/center";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductGrid from "@/components/productGrid";
import Title from "@/components/title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import styled from "styled-components";

function ProductsPage({ products }) {
  return (
    <>
      <Header></Header>
      <Center>
        {" "}
        <Title>All Products</Title>
        <ProductGrid products={products} />
      </Center>
      <Footer />
    </>
  );
}

export default ProductsPage;
export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
