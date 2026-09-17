module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    testRegex: "\\.test\\.ts$",
    transform: {
        "^.+\\.ts$": "babel-jest",
    },
    moduleFileExtensions: ["ts", "js", "json"],
    clearMocks: true,
    verbose: true,
    coverageDirectory: "coverage",
};
