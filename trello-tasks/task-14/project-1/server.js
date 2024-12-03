const fs = require("fs");
const https = require("http");
const WebSocket = require("ws");

const SERVER_PORT = 8099;

// const privateKey = fs.readFileSync("path/to/private-key.pem", "utf8");
// const certificate = fs.readFileSync("path/to/certificate.pem", "utf8");
// const ca = fs.readFileSync("path/to/ca-cert.pem", "utf8");

const serverOptions = {
  // key: privateKey,
  // cert: certificate,
  // ca: ca,
};

const server = https.createServer(serverOptions);
const wss = new WebSocket.Server({ server });

let onlineUserList = [];

const escapeHtml = (str) => {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return escapeMap[match];
  });
};

const sendUserListToClients = () => {
  const userListMessage = JSON.stringify({
    type: "userList",
    content: { users: onlineUserList },
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(userListMessage);
    }
  });
};

wss.on("connection", (ws) => {
  console.log("User connected securely!");

  ws.on("message", (payload) => {
    try {
      const data = JSON.parse(payload);
      if (data.type === "message") {
        const userName = escapeHtml(data.content.userName);
        const userMessage = escapeHtml(data.content.message);

        const messagePayload = JSON.stringify({
          type: "message",
          content: {
            userName: userName,
            message: userMessage,
          },
        });

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(messagePayload);
          }
        });
      }
      if (data.type === "nickname") {
        const userNickName = escapeHtml(data.content.userName);
        ws.userName = userNickName;
        if (!onlineUserList.includes(userNickName)) {
          onlineUserList.push(userNickName);
        }
        sendUserListToClients();
      }
    } catch (error) {
      console.error("Message handle error:", error);
    }
  });

  ws.on("close", () => {
    console.log("User disconnected!");
    onlineUserList = onlineUserList.filter((user) => user !== ws.userName);
    sendUserListToClients();
  });
});

server.listen(SERVER_PORT, () => {
  console.log(
    `Secure WebSocket server running on wss://localhost:${SERVER_PORT}`
  );
});
