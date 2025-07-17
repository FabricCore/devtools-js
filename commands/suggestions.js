let fs = require("fs");

function getLocalPackageList() {
    return fs.readdirSync("modules");
}

function getOpenablePackages() {
    let opened = new Set(fs.readdirSync("opened"));
    return fs.readdirSync("modules").filter((name) => !opened.has(name));
}

function getCloseablePackages() {
    if (!fs.existsSync("opened")) return [];
    return fs.readdirSync("opened");
}

module.exports = {
    getLocalPackageList,
    getOpenablePackages,
    getCloseablePackages,
};
