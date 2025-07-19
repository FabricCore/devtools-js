let fs = require("fs");

function openOne(name) {
    if (!fs.existsSync(`modules/${name}`)) {
        console.error(`No module exists at modules/${name}`);
        return false;
    }

    if (fs.existsSync(`opened/${name}`)) {
        console.error(`A folder already exists at opened/${name}`);
        return false;
    }

    fs.mkdirSync("opened");
    fs.symlinkSync(`modules/${name}`, `opened/${name}`);
    console.info(`Opened package at opened/${name}`);
    return true;
}

function open(names) {
    if (!module.globals.devtools.supportSymlink) return;

    let opened = 0;

    for (let name of Array.from(new Set(names))) {
        if (openOne(name)) opened++;
    }

    console.info(`Opened ${opened} packages.`);
}

function closeOne(name) {
    if (!fs.isSymlinkSync(`opened/${name}`)) {
        if (fs.existsSync(`opened/${name}`)) {
            console.error(
                `There is a file at opened/${name} but it is not a symlink.`,
            );
        } else {
            console.error(`No folder at opened/${name}`);
        }
        return false;
    }

    fs.unlinkSync(`opened/${name}`, false);
    console.info(`Closed package at opened/${name}`);
    return true;
}

function close(names) {
    let closed = 0;
    for (let name of Array.from(new Set(names))) {
        if (closeOne(name)) closed++;
    }
    console.info(`Closed ${closed} packages.`);
}

module.exports = { open, close };
