let { evalSync } = module.require("../operations");

function _eval(at, expr) {
    evalSync(expr, at, true);

    return 0;
}

module.exports = {
    _eval,
};
