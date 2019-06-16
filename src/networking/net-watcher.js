"use strict";

const fs = require("fs");
const net = require("net");

const fileName = process.argv[2];

if (!fileName) throw Error("No file name specified.");

net.createServer(connection => {
    console.log("Subscriber connected.");
    connection.write(`Watching ${fileName} for changes.\n`);

    const watcher = fs.watch(fileName, () => {
        connection.write(`File changed: ${new Date()}.\n`);
    });

    connection.on("close", () => {
        console.log("Subscriber disconnected.");
        watcher.close();
    });
}).listen(60300, () => console.log(`Listening for subscribers...`));
