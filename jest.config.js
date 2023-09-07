const fs = require("fs");
const path = require("path");

const buildModuleNameMapper = () => {
  const tsconfigText = fs.readFileSync("tsconfig.json", "utf-8");
  const tsconfigJson = JSON.parse(tsconfigText);
  if (tsconfigJson?.compilerOptions?.paths === undefined) return {};
  const { paths } = tsconfigJson.compilerOptions;
  return Object.entries(paths)
    .map(path => ({ alias: path[0], index: path[1][0] }))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.alias]: path.resolve(__dirname, curr.index)
      };
    }, {});
};

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ["core-js/features/reflect"],
  testEnvironment: "jest-environment-node",
  moduleNameMapper: buildModuleNameMapper()
};

module.exports = config;
