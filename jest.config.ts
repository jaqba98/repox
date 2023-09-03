import { readFileSync } from "fs";
import { resolve } from "path";
import type { Config } from "jest";

interface TsconfigJsonModel {
  compilerOptions: {
    paths: Record<string, string[]>;
  };
}

function buildModuleNameMapper (): Record<string, string> {
  const tsconfigText = readFileSync(`tsconfig.json`, `utf-8`);
  const tsconfigJson = JSON.parse(tsconfigText) as TsconfigJsonModel;
  if (
    tsconfigJson === undefined ||
    tsconfigJson.compilerOptions === undefined ||
    tsconfigJson.compilerOptions.paths === undefined
  ) {
    return {};
  }
  const { paths } = tsconfigJson.compilerOptions;
  return Object.entries(paths)
    .map(path => ({ alias: path[0], index: path[1][0] }))
    .reduce((
      acc: Record<string, string>,
      curr: { alias: string, index: string }
    ): Record<string, string> => {
      acc = { ...acc, [curr.alias]: resolve(__dirname, curr.index) };
      return acc;
    }, {});
}

const config: Config = {
  clearMocks: true,
  coverageProvider: `v8`,
  preset: `ts-jest`,
  setupFilesAfterEnv: [`core-js/features/reflect`],
  testEnvironment: `jest-environment-node`,
  moduleNameMapper: buildModuleNameMapper()
};

export default config;
