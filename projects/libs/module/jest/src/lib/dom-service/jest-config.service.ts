import { Config } from "jest";

export const getDefaultWorkspaceJestConfig = (): Config => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["reflect-metadata"],
    testMatch: ["**/*.(spec|test).ts"],
    moduleNameMapper: {}
  };
};
