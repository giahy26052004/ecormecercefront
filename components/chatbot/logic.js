class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };
    this.state = false;
    this.messages = [];
  }
  display() {
    const { openButton, chatBox, sendButton } = this.args;
    openButton.addEventListener("click", () => this.toggleState(chatBox));
    sendButton.addEventListener("click", () => this.onSentButton(chatBox));
    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSentButton(chatBox);
      }
    });
  }
  toggleState(chatBox) {
    this.state = !this.state;
    if (this.state) {
      chatBox.classList.add("chatbox--active");
    } else {
      chatBox.classList.remove("chatbox--active");
    }
  }
  onSentButton(chatBox) {
    var textField = chatBox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }
    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);
    fetch($SCRIPT_ROOT + "/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let msg2 = { name: "Sam", message: data.answer };
        this.messages.push(msg2);
        this.updateChatText(chatBox);
        textField.value = "";
      })
      .catch((error) => {
        console.log(error);
        this.updateChatText(chatBox);
        textField.value = "";
      });
  }
  updateChatText(chatBox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Sam") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });
    const chatmessage = chatBox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}
const chatbox = new Chatbox();
chatbox.display();
