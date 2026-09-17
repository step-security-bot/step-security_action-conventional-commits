module.exports = {
    sourceType: "unambiguous",
    presets: [
        [
            "@babel/preset-env",
            {
                targets: { node: "current" },
                modules: "commonjs",
            },
        ],
        [
            "@babel/preset-typescript",
            {
                allowDeclareFields: true,
            },
        ],
    ],
};
