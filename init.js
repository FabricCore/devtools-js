let { StringArgumentType } = com.mojang.brigadier.arguments;

let command = require("command");

let pullyCommands = module.require("./commands");

command.register({
    name: "devtools",

    subcommands: {
        "new": {
            args: {
                name: {
                    type: StringArgumentType.word(),
                    execute: pullyCommands._new
                }
            }
        }
    }
});
