let devtools = module.require("../operations");
let { getCloseablePackages } = module.require("./suggestions");

let maxDepth = 256;

function buildCloseCommand(currentDepth = 1) {
    if (currentDepth == 1) {
        return {
            execute: function (...names) {
                devtools.close(Array.from(names));
            },
            args: {
                package1: buildCloseCommand(currentDepth + 1),
            },
        };
    }

    let command = {
        suggests: getCloseablePackages,
        type: "word",
        execute: function (...names) {
            devtools.close(Array.from(names));
        },
    };

    if (currentDepth <= maxDepth) {
        command.args = {};
        command.args[`package${currentDepth}`] = buildCloseCommand(
            currentDepth + 1,
        );
    }

    return command;
}

module.exports = { buildCloseCommand };
