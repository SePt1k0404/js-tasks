"use strict";

let userName = "Anonym :)";

const refs = {
  chat: document.getElementById("chat"),
  nameInput: document.getElementById("nickname"),
  messageInput: document.getElementById("message"),
  sendMessageButton: document.getElementById("send-message-btn"),
  saveNicknameButton: document.getElementById("send-name-btn"),
  userList: document.getElementById("users-list"),
};

const socket = new WebSocket("ws://localhost:8080");

const sendMessage = () => {
  const message = refs.messageInput.value;
  if (message) {
    const payload = JSON.stringify({
      type: "message",
      content: { userName, message },
    });
    socket.send(payload);
    refs.messageInput.value = "";
  }
};

const getNickName = () => {
  userName = refs.nameInput.value;
  refs.nameInput.parentElement.classList.add("hidden");
  refs.chat.classList.remove("hidden");
  refs.messageInput.parentElement.classList.remove("hidden");
  const nickname = JSON.stringify({
    type: "nickname",
    content: { userName },
  });
  socket.send(nickname);
};

socket.onmessage = (evt) => {
  const data = JSON.parse(evt.data);
  if (data.type === "message") {
    const userName = data.content.userName;
    const userMessage = data.content.message;
    const message = document.createElement("div");
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("username");
    nameSpan.textContent = userName;
    const messageText = document.createElement("span");
    messageText.classList.add("message-text");
    messageText.textContent = userMessage;
    message.appendChild(nameSpan);
    message.appendChild(messageText);
    refs.chat.appendChild(message);
    refs.chat.scrollTop = refs.chat.scrollHeight;
  } else if (data.type === "userList") {
    refs.userList.innerHTML = "";
    data.content.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user;
      refs.userList.appendChild(li);
    });
  }
};

refs.sendMessageButton.addEventListener("click", sendMessage);
refs.saveNicknameButton.addEventListener("click", getNickName);
