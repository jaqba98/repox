// TODO: remove the eslint comment
/* eslint-disable max-len */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["reflect-metadata"],
  testMatch: ["**/*.(spec|test).ts"],
  rootDir: __dirname,
  moduleNameMapper: {
    "@lib/const": "<rootDir>/projects/libs/const/src/index.ts",
    "@lib/launcher": "<rootDir>/projects/libs/launcher/src/index.ts",
    "@lib/logger": "<rootDir>/projects/libs/logger/src/index.ts",
    "@lib/model": "<rootDir>/projects/libs/model/src/index.ts",
    "@lib/param-domain": "<rootDir>/projects/libs/param-domain/src/index.ts",
    "@lib/param-dto": "<rootDir>/projects/libs/param-dto/src/index.ts",
    "@lib/program-step": "<rootDir>/projects/libs/program-step/src/index.ts",
    "@lib/repox-const": "<rootDir>/projects/libs/repox-const/src/index.ts",
    "@lib/repox-domain": "<rootDir>/projects/libs/repox-domain/src/index.ts",
    "@lib/repox-main": "<rootDir>/projects/libs/repox-main/src/index.ts",
    "@lib/repox-program": "<rootDir>/projects/libs/repox-program/src/index.ts",
    "@lib/repox-workspace": "<rootDir>/projects/libs/repox-workspace/src/index.ts",
    "@lib/utils": "<rootDir>/projects/libs/utils/src/index.ts"
  }
};

export default config;
