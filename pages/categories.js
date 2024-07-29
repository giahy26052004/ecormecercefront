import CategoryGrid from "@/components/categoryGrid";
import Center from "@/components/center";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductGrid from "@/components/productGrid";
import Title from "@/components/title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";
import { Product } from "@/models/product";

function Categories({ newProducts, categories }) {
  console.log("check", { newProducts, categories });
  return (
    <>
      <Header />
      <Center>
        {" "}
        <Title>Categories</Title>
        <CategoryGrid products={newProducts} categories={categories} />
      </Center>
      <Footer />
    </>
  );
}

export default Categories;
export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
