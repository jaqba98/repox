import { Config } from "jest";

import { getModuleNameMapper } from "../infrastructure/module-name-mapper.service";

export const getDefaultWorkspaceJestConfig = (): Config => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["reflect-metadata"],
    testMatch: ["**/*.(spec|test).ts"],
    moduleNameMapper: getModuleNameMapper()
  };
};
