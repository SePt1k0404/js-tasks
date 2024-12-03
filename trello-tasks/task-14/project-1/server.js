const WebSocket = require("ws");
const PORT_VALUE = 8080;

const wss = new WebSocket.Server({ port: PORT_VALUE });

let onlineUserList = [];

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
  console.log("User connected!");

  ws.on("message", (payload) => {
    try {
      const data = JSON.parse(payload);
      if (data.type === "message") {
        const userName = data.content.userName;
        const userMessage = data.content.message;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "message",
                content: {
                  userName,
                  message: userMessage,
                },
              })
            );
          }
        });
      }

      if (data.type === "nickname") {
        const userNickName = data.content.userName;
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
    console.log("User unconnected!");
    onlineUserList = onlineUserList.filter((user) => user !== ws.userName);
    sendUserListToClients();
  });
});

console.log(`WebSocket server is working on port: ${PORT_VALUE}`);
