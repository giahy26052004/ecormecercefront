import Button from "@/components/button";
import { CartContext } from "@/components/cartcontext";
import Center from "@/components/center";
import Header from "@/components/header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Table from "@/components/table";
import Input from "@/components/input";
import { Modal } from "@/components/modal";
import { Router, useRouter } from "next/router";
const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  max-width: 100px;
  max-height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;
const CityHolder = styled.span`
  display: flex;
  gap: 5px;
`;
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  let total = 0;
  if (cartProducts.length > 0) {
    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId)?.price || 0;
      total += price;
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const submitForm = async () => {
    try {
      const formData = {
        name,
        email,
        city,
        streetAddress,
        phone,
        products: cartProducts.join(","),
      };

      const response = await axios.post("/api/checkout", formData);

      console.log("Order created:", response.data); // Log the response data
      clearCart(); // Clear the cart
      router.push("/cart"); // Redirect to /cart after successful order creation
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const quantity = products
    .map(
      (product) =>
        cartProducts.filter((id) => id === product._id).length * product.price
    )
    .reduce((acc, product) => acc + product, 0);
  const paymentInfo = {
    name,
    email,
    quantity,
    city,
    streetAddress,
    phone,
    products: products,
  };
  const id = 0;
  const MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0989807405",
  };
  const moment = require("moment-timezone");
  const currentTimestamp = Date.now();
  const vietnamTime = moment(currentTimestamp)
    .tz("Asia/Ho_Chi_Minh")
    .format("YYYY-MM-DD HH:mm:ss");
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty </div>
            )}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.title}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="image" />
                        </ProductImageBox>
                        {product.title}{" "}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => {
                            lessOfThisProduct(product._id);
                          }}
                        >
                          -
                        </Button>
                        <QuantityLabel>
                          {" "}
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <form
                method="POST"
                id="checkoutForm"
                action="/api/checkout"
                onSubmit={handleSubmit}
              >
                <Input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />{" "}
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                </CityHolder>

                <Input
                  type="text"
                  placeholder="phone"
                  value={phone}
                  name="phone"
                  onChange={(ev) => setPhone(ev.target.value)}
                />
                <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                />
                <Button black="true" type="submit" block="true">
                  Continue to payment
                </Button>
              </form>
              <Modal
                showModal={showModal}
                submitForm={submitForm}
                handleClose={handleClose}
                setShowModal={setShowModal}
                paymentInfo={paymentInfo}
                MY_BANK={MY_BANK}
              />
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
