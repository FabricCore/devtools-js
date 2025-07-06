let { create } = module.require("../operations")
let { StringArgumentType } = com.mojang.brigadier.arguments;

function _new(ctx) {
    let name = StringArgumentType.getString(ctx, "name");

    create(name, true).catch((e) =>
        console.error(
            `Something went wrong when creating package.\nCause: ${e}`,
        ),
    );

    return 0;
}

module.exports = {
    _new
}
