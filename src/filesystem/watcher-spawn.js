"use strict";

const fs = require("fs");
const { spawn } = require("child_process");
const fileName = process.argv[2];

if (!fileName) throw Error('No specified file name.');

fs.watch(fileName, () => {
    const ls = spawn("ls", ["-l", "-h", fileName]);
    ls.stdout.pipe(process.stdout);
});

console.log(`Now watching ${fileName}.`);
