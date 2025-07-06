let { evalSync } = module.require("../operations");
let { StringArgumentType } = com.mojang.brigadier.arguments;

function _eval(ctx) {
    let at = StringArgumentType.getString(ctx, "at");
    let expr = StringArgumentType.getString(ctx, "expression");

    evalSync(expr, at, true);

    return 0;
}

module.exports = {
    _eval,
};
