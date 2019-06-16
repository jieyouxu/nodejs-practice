"use strict";

const zmq = require("zeromq");

const fileName = process.argv[2];

const requester = zmq.socket("req");

requester.on("message", data => {
    const response = JSON.parse(data);
    console.log(`Received response: ` + response.toString());
});

requester.connect("tcp://localhost:60401");

// Send content request
console.log(`Sending a request for ${fileName}.`);
requester.send(JSON.stringify({ path: fileName }));
