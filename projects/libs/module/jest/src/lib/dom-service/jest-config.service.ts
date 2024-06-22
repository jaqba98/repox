import { Config } from "jest";

export const defaultConfig = (): Config => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["reflect-metadata"],
    testMatch: ["**/*.(spec|test).ts"]
  };
};
