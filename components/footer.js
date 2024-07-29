import React from "react";
import styled from "styled-components";
import ChatBot from "./chatbot";

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 50px;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavLink = styled.a`
  color: #aaa;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>&copy; 2024 My Company. All rights reserved.</Copyright>
        <SocialLinks>
          <SocialLink href="https://www.facebook.com/hylamlo/" target="_blank">
            Phone: 0989807405
          </SocialLink>
        </SocialLinks>
        <NavLinks>
          <NavLink href="https://www.facebook.com/hylamlo/">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
            </div>
            <span>Contact</span>
          </NavLink>
        </NavLinks>
      </FooterContent>
      <ChatBot />
    </FooterContainer>
  );
};

export default Footer;
