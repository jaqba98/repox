const path = require("path");

const config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ["core-js/features/reflect"],
  testEnvironment: "jest-environment-node",
  moduleNameMapper: {
    "@lib/const": path.resolve(__dirname, "projects/libs/const/src/index.ts"),
    "@lib/utils": path.resolve(__dirname, "projects/libs/utils/src/index.ts")
  },
};

module.exports = config;
