let { StringArgumentType } = com.mojang.brigadier.arguments;

let command = require("command");

let devtoolsCommands = module.require("./commands");

command.register({
    name: "devtools",

    subcommands: {
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
        open: devtoolsCommands.buildOpenCommand(),
        close: devtoolsCommands.buildCloseCommand(),
        "close-all": devtoolsCommands.closeAll,
    },
});
