"use strict";

const fs = require("fs");

const fileName = process.argv[2];

if (!fileName) throw Error("No file name specified.");

fs.watch(fileName, () => console.log(`File ${fileName} changed!`));

console.log(`Now watching ${fileName}!`);
