let { create } = module.require("../operations");

function _new(name) {
    create(name, true).catch((e) =>
        console.error(
            `Something went wrong when creating package.\nCause: ${e}`,
        ),
    );

    return 0;
}

module.exports = {
    _new,
};
