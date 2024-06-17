import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["reflect-metadata"],
  testMatch: ["**/*.(spec|test).ts"]
};

export default config;
