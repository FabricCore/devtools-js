let devtools = module.require("../operations");
let { getOpenablePackages } = module.require("./suggestions");

let maxDepth = 256;

function buildOpenCommand(currentDepth = 1) {
    if (currentDepth == 1) {
        return {
            execute: function (...names) {
                devtools.open(Array.from(names));
            },
            args: {
                package1: buildOpenCommand(currentDepth + 1),
            },
        };
    }

    let command = {
        suggests: getOpenablePackages,
        type: "word",
        execute: function (...names) {
            devtools.open(Array.from(names));
        },
    };

    if (currentDepth <= maxDepth) {
        command.args = {};
        command.args[`package${currentDepth}`] = buildOpenCommand(
            currentDepth + 1,
        );
    }

    return command;
}

module.exports = { buildOpenCommand };
