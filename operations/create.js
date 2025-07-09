let template = {
    version: "0.1.0",
    description: "Hello JSCore!",

    keywords: [],
    license: "LGPL-3.0-or-later",
    author: {
        name: "Your Name",
        email: "yourname@domain.com",
        url: "https://example.com",
    },
    repository: {
        type: "git",
        url: "https://github.com/yourname/reponame-js",
    },

    dependencies: {
        rinode: "0.1.0",
    },
};

let fs = require("fs");

function createSync(name, log) {
    if (fs.existsSync(`modules/${name}`)) {
        console.error(`There is already a package with the name "${name}".`);
        return;
    }

    fs.mkdirSync(`modules/${name}`);

    let manifest = { name };
    Object.assign(manifest, template);

    fs.writeFileSync(
        `modules/${name}/package.json`,
        JSON.stringify(manifest, null, 2),
    );

    fs.writeFileSync(
        `modules/${name}/index.js`,
        `function packageName() {\n  return "my-package!";\n}\n\nmodule.exports = {\n  packageName,\n};`,
    );

    fs.writeFileSync(
        `modules/${name}/init.js`,
        'console.log("Hello JSCore!");\nconsole.log("Learn how to write a module on https://jscore.siri.ws/dev/");',
    );

    if (log) console.info(`Package created at modules/${name}.`);
}

function create(name, log) {
    return Promise(() => createSync(name, log));
}

module.exports = {
    createSync,
    create,
};
