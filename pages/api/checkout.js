import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const { name, email, city, streetAddress, phone, products } = req.body;
  await mongooseConnect();
  const productIds = products.split(",");
  const uniqueIds = [...new Set(productIds)];
  const productInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id === productId).length || 0;
    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo?.title || "" },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    streetAddress,
    phone,
    paid: true,
  });
  res.json(orderDoc);
}
