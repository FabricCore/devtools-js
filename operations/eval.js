let fs = require("fs");
let { Runtime } = Packages.ws.siri.jscore.runtime;

let { MinecraftClient } = Yarn.net.minecraft.client;
let { Text } = Yarn.net.minecraft.text;
let { Formatting } = Yarn.net.minecraft.util;

function evalSync(content, at, print) {
    if (!fs.existsSync(`modules/${at}`)) {
        console.error(`No package at ${at}.`);
        return;
    }

    if (print && MinecraftClient.getInstance().player != null)
        MinecraftClient.getInstance()
            .inGameHud.getChatHud()
            .addMessage(
                Text.literal("> ").append(content).formatted(Formatting.GREEN),
            );

    let packageModule = Runtime.getModule(
        java.util.List.of("modules", at, "devtools-repl"),
    );

    let res = packageModule.eval(content);

    if (print && MinecraftClient.getInstance().player != null)
        MinecraftClient.getInstance()
            .inGameHud.getChatHud()
            .addMessage(Text.literal(`${res}`).formatted(Formatting.YELLOW));
}

// .catch does not work idk why
function eval(content, at, print) {
    return Promise(() => evalSync(content, at, print));
}

module.exports = {
    evalSync,
    eval,
};
