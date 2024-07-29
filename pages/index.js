import Feature from "@/components/featured";
import Footer from "@/components/footer";
import Header from "@/components/header";
import NewProducts from "@/components/newproducts";
import Slideshow from "@/components/slideshow";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default function HomePage({
  feateredProduct,
  newProducts,
  slideShowProduct,
}) {
  console.log({ slideShowProduct });
  return (
    <div>
      <Header />
      <Feature
        image={slideShowProduct?.images || []}
        product={feateredProduct}
      />
      <NewProducts newProducts={newProducts} />
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  const featuresProductID = "667d5f7b4b7bd146b5870eda";
  await mongooseConnect();
  const feateredProduct = await Product.findById(featuresProductID);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const slideShowProduct = await Product.find({ title: "Iphone 14 pro" });
  console.log(slideShowProduct);

  return {
    props: {
      feateredProduct: JSON.parse(JSON.stringify(feateredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      slideShowProduct: JSON.parse(JSON.stringify(slideShowProduct)),
    },
  };
}
