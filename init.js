let command = require("command");

let devtoolsCommands = module.require("./commands");

let { Util } = Yarn.net.minecraft.util;
let isSupportedSystem = !Util.getOperatingSystem().equals(
    Util.OperatingSystem.WINDOWS,
);

module.globals.devtools = {
    supportSymlink: isSupportedSystem,
};

let subcommands = {
    new: {
        args: {
            name: {
                type: "word",
                execute: devtoolsCommands._new,
            },
        },
    },
    eval: {
        args: {
            at: {
                suggests: devtoolsCommands.getLocalPackageList,
                type: "word",
                args: {
                    expression: {
                        type: "greedy",
                        execute: devtoolsCommands._eval,
                    },
                },
            },
        },
    },
};

if (isSupportedSystem)
    Object.assign(subcommands, {
        open: devtoolsCommands.buildOpenCommand(),
        close: devtoolsCommands.buildCloseCommand(),
        "close-all": devtoolsCommands.closeAll,
    });

command.register({
    name: "devtools",
    subcommands,
});
