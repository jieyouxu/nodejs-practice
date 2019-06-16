"use strict";

const fs = require("fs");
const { spawn } = require("child_process");
const fileName = process.argv[2];

if (!fileName) throw Error('No specified file name.');

fs.watch(fileName, () => {
    const ls = spawn("ls", ["-l", "-h", fileName]);
    let output = "";

    ls.stdout.on("data", chunk => output += chunk);

    ls.on("close", () => {
        const parts = output.split(/\s+/);
        console.log([parts[0], parts[4], parts[8]]);
    });
});

console.log(`Now watching ${fileName}.`);
