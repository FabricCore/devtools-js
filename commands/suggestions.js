let fs = require("fs");

function getLocalPackageList() {
    return fs.readdirSync("modules");
}

module.exports = {
    getLocalPackageList,
};
