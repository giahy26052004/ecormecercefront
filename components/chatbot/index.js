import React from "react";
import styled from "styled-components";
import ChatBot from "./chatbot"; // Adjust the path as per your project structure

// Styled container to center the chatbot
const Container = styled.div`
 /* Semi-transparent background */

`;

// Styled chatbox container


const App = () => {
  return (
    <Container className="container">
        <ChatBot />
    </Container>
  );
};

export default App;
