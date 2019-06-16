"use strict";

const fs = require("fs");
const net = require("net");

const fileName = process.argv[2];

if (!fileName) throw Error("No file name specified.");

net.createServer(connection => {
    console.log("Subscriber connected.");
    const initialResponse =
        JSON.stringify({type: "watching", file: fileName})
        + "\n";
    connection.write(initialResponse);

    const watcher = fs.watch(fileName, () => {
        const response =
            JSON.stringify({type: "changed", timestamp: Date.now()})
            + "\n";
        connection.write(response);
    });

    connection.on("close", () => {
        console.log("Subscriber disconnected.");
        watcher.close();
    });
}).listen(60300, () => console.log(`Listening for subscribers...`));
