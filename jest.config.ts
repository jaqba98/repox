import type { Config } from "jest";
import * as path from "path";

const config: Config = {
  clearMocks: true,
  coverageProvider: `v8`,
  preset: `ts-jest`,
  setupFilesAfterEnv: [`core-js/features/reflect`],
  testEnvironment: `jest-environment-node`,
  moduleNameMapper: {
    "@lib/const": path.resolve(__dirname, `projects/libs/const/src/index.ts`)
  }
};

export default config;
