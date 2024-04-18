import { resolve } from "path";

export const clearMocks = true;
export const coverageProvider = "v8";
export const preset = "ts-jest";
export const setupFilesAfterEnv = ["core-js/features/reflect"];
export const testEnvironment = "jest-environment-node";
export const moduleNameMapper = {
    "@lib/const": resolve(__dirname, "projects/libs/enum/src/index.ts"),
    "@lib/utils": resolve(__dirname, "projects/libs/utils/src/index.ts")
};
