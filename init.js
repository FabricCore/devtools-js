let { StringArgumentType } = com.mojang.brigadier.arguments;

let command = require("command");

let devtoolsCommands = module.require("./commands");

command.register({
    name: "devtools",

    subcommands: {
        new: {
            args: {
                name: {
                    type: StringArgumentType.word(),
                    execute: devtoolsCommands._new,
                },
            },
        },
        eval: {
            args: {
                at: {
                    suggests: devtoolsCommands.getLocalPackageList,
                    type: StringArgumentType.word(),
                    args: {
                        expression: {
                            type: StringArgumentType.greedyString(),
                            execute: devtoolsCommands._eval,
                        },
                    },
                },
            },
        },
    },
});
