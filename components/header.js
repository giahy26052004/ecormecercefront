import Link from "next/link";
import styled from "styled-components";
import Center from "./center";
import { useContext, useState } from "react";
import { CartContext } from "./cartcontext";
import BarsIcon from "./bars";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  display: ${(props) => (props.mobilenavactive == "true" ? "block" : "none")};
  gap: 15px;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0px;
  }
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: #fff;
  position: relative;
  z-index: 3;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobilenavactive, setMobileNavActive] = useState(false);
  console.log(mobilenavactive);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobilenavactive={mobilenavactive.toString()}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length ?? 0})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((pre) => !pre)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
