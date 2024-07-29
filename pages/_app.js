import CartContextProvider from "@/components/cartcontext";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
body{
  background-color:#eee;
padding:0;
margin:0;
font-family: "Poppins",sans-serif;
}
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
