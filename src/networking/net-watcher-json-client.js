"use strict";

const net = require("net");

const client = net.connect({ port: 60300 });

const handleWatching = ({ file }) => {
    console.log(`Now watching ${file}.`);
};

const handleChanged = ({ timestamp }) => {
    const date = new Date(timestamp);
    console.log(`File changed ${date}.`);
};

const handleUnknown = () => console.log("Unrecognized message format.");

client.on('data', data => {
    const message = JSON.parse(data);

    if (message.type) {
        switch (message.type) {
            case "watching":
                handleWatching(message);
                break;
            case "changed":
                handleChanged(message);
                break;
            default:
                handleUnknown();
                break;
        }
    } else {
        console.log("Missing message type.")
    }
});
