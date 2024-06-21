import "reflect-metadata";
import { Config } from "jest";

import { findWorkspacePath, readJsonFile, createPath } from "@lib/utils";

const getModuleNameMapper = (): Config["moduleNameMapper"] => {
  const currentPath = process.cwd();
  const workspacePath = findWorkspacePath(currentPath);
  const tsconfigJsonPath = createPath(workspacePath, "tsconfig.json");
  const tsconfigJson: any = readJsonFile(tsconfigJsonPath);
  const paths = tsconfigJson.compilerOptions.paths;
  return Object.keys(paths).reduce((acc: any, curr: any) => {
    acc[curr] = `<rootDir>/${paths[curr]}`;
    return acc;
  }, {});
};

export const workspaceJestConfig: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["reflect-metadata"],
  testMatch: ["**/*.(spec|test).ts"],
  moduleNameMapper: getModuleNameMapper()
};
