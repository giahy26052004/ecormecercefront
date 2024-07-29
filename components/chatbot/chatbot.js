import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Define styled components for each section
const ChatboxContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 20px;
  .chatbox__button {
    margin-bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
`;

const SupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  width: 350px;
  height: 400px;
  z-index: -123456;
  margin-top: 5px;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  padding: 10px;
  border-radius: 10px;
  &.chatbox--active {
    transform: translateY(-40px);
    z-index: 123456;
    opacity: 1;
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  background: linear-gradient(93.12deg, #581b98 0.52%, #9c1de7 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 310px;
  gap: 20px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  .chatbox__image--header {
  }
`;

const Messages = styled.div`
  margin-top: auto;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;

  .messages__item {
    margin-top: 10px;

    padding: 8px 32px;
    color: black;
  }
  .messages__item--sam {
    background: #fff;
    margin-right: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .messages__item--user {
    background: linear-gradient(93.12deg, #581b98 0.52%, #9c1de7 100%);
    margin-left: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .messages__item--operator {
    margin-left: auto;
  }
  .chatbox__heading--header {
    margin-right: 30px;
  }
  .messages__item--visitor {
    margin-right: auto;
  }

  .messages__item--operator {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #f9f9f9;
    color: white;
  }

  .messages__item--visitor,
  .messages__item--typing {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(268.91deg, #581b98 -2.14%, #9c1de7 99.69%);
  box-shadow: linear-gradient(268.91deg, #581b98 -2.14%, #9c1de7 99.69%);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-top: 20px;

  input {
    width: 80%;
    border: none;
    padding: 10px;
    border-radius: 30px;
    text-align: left;
  }

  .send__button {
    color: black;
    padding: 10px;
    background: white;
    border: none;
    outline: none;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
const ButtonChatBot = styled.button`
  background: linear-gradient(93.12deg, #581b98 0.62%, #9c1de7 100%);
  cursor: pointer;
  margin-left: 280px;
`;
const SendButton = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 4px;
  margin-right: -4px;
`;

// Main ChatBot component
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const isSendingRef = useRef(false);
  console.log("sam", messages);
  useEffect(() => {
    const openButton = document.querySelector(".chatbox__button");
    const chatBox = document.querySelector(".chatbox__support");
    const sendButton = document.querySelector(".send__button");
    const inputField = chatBox.querySelector("input");

    const toggleState = () => {
      setIsOpen(!isOpen);
      if (!isOpen) {
        chatBox.classList.add("chatbox--active");
      } else {
        chatBox.classList.remove("chatbox--active");
      }
    };

    const onSendMessage = () => {
      const text = inputField.value.trim();
      if (text === "" || isSendingRef.current) return;

      const userMessage = { name: "User", message: text };
      const updatedMessages = [...messages, userMessage]; // Include previous messages
      setMessages(updatedMessages);

      fetch("https://ai-chatbot-vgs4.onrender.com/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      })
        .then((response) => response.json())
        .then((data) => {
          const samMessage = { name: "Sam", message: data.answer };
          const updatedMessagesWithResponse = [...updatedMessages, samMessage]; // Include response message
          setMessages(updatedMessagesWithResponse);
          inputField.value = "";
          isSendingRef.current = false;
        })
        .catch((error) => {
          console.log(error);
          inputField.value = "";
          isSendingRef.current = false;
        });
    };

    openButton.addEventListener("click", toggleState);
    sendButton.addEventListener("click", onSendMessage);
    inputField.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        onSendMessage();
      }
    });

    return () => {
      openButton.removeEventListener("click", toggleState);
      sendButton.removeEventListener("click", onSendMessage);
      inputField.removeEventListener("keyup", onSendMessage);
    };
  }, [isOpen, messages]);

  const updateChatText = () => {
    return messages.slice().map((item, index) => {
      console.log(item.name);
      return (
        <div
          key={index}
          className={`messages__item messages__item--${item.name.toLowerCase()}`}
        >
          {item.message}
        </div>
      );
    });
  };

  return (
    <ChatboxContainer className="chatbox">
      <SupportContainer className="chatbox__support">
        <Header className="chatbox__header">
          <div className="chatbox__image--header">
            <img
              src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
              alt="image"
            />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Chat support</h4>
            <p className="chatbox__description--header"></p>
          </div>
        </Header>
        <Messages className="chatbox__messages">{updateChatText()}</Messages>
        <Footer className="chatbox__footer">
          <input type="text" placeholder="Write a message..." />
          <SendButton className="send__button chatbox__send--footer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </SendButton>
        </Footer>
      </SupportContainer>
      <div className="chatbox__button">
        <ButtonChatBot className="chatbox__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 chatbox__button-img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </ButtonChatBot>
      </div>
    </ChatboxContainer>
  );
};

export default ChatBot;
