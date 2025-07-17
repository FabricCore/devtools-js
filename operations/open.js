let { Files, Path } = java.nio.file;

let fs = require("fs");

function openOne(name) {
    if (!fs.existsSync(`modules/${name}`)) {
        console.error(`No module exists at modules/${name}`);
        return;
    }

    if (fs.existsSync(`opened/${name}`)) {
        console.error(`A folder already exists at opened/${name}`);
    }

    fs.mkdirSync("opened");
    fs.symlinkSync(`modules/${name}`, `opened/${name}`);
    console.info(`Opened package at opened/${name}`);
}

function open(names) {
    for (let name of Array.from(new Set(names))) {
        openOne(name);
    }
}

function closeOne(name) {
    if (!fs.existsSync(`opened/${name}`)) {
        console.error(`No folder at opened/${name}`);
    }

    fs.unlinkSync(`opened/${name}`, false);
    console.info(`Closed package at opened/${name}`);
}

function close(names) {
    for (let name of Array.from(new Set(names))) {
        closeOne(name);
    }
}

module.exports = { open, close };
