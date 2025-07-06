let fs = require("fs");
let Runtime = Packages.ws.siri.jscore.runtime.Runtime;

let net = Packages.ws.siri.jscore.mapping.JSPackage.getRoot().net;
let MinecraftClient = net.minecraft.client.MinecraftClient;
let Text = net.minecraft.text.Text;
let Formatting = net.minecraft.util.Formatting;

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
