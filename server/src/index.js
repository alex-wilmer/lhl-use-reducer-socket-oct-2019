const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", client => {
  client.on("message", message => {
    console.log("received: %s", message);

    const parsedMessage = JSON.parse(message);

    parsedMessage.date = Date.now();

    wss.clients.forEach(client => {
      client.send(JSON.stringify(parsedMessage));
    });
  });

  const serverMessage = {
    name: "bot",
    message: "welcome to the chat",
    date: Date.now()
  };

  client.send(JSON.stringify(serverMessage));

  console.log("hey somebody connected yay");
});
