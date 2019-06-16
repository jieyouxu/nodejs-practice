"use strict";

const net = require("net");

const server = net.createServer(connection => {
    console.log("Subscriber connected.");

    // Two message chunks that together make a whole message.
    const firstChunk = `{"type":"changed","timesta`;
    const secondChunk = `mp":1450694370094}\n`;

    // Send the first chunk immediately.
    connection.write(firstChunk);

    const timer = setTimeout(() => {
        connection.write(secondChunk);
        conection.end();
    }, 100);

    connection.on("end", () => {
        clearTimeout(timer);
        console.log("Subscriber disconnected.");
    })
});

server.listen(60300, () => {
    console.log("Test server listening for subscribers...")
});
