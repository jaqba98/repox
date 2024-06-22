import "reflect-metadata";
import { Config } from "jest";

import {
  getDefaultWorkspaceJestConfig
} from "../dom-service/jest-config.service";

export const workspaceJestConfig = (custom: Config): Config => {
  return {
    ...getDefaultWorkspaceJestConfig(),
    ...custom
  };
};

export const projectJsonConfig = (custom: Config): Config => {
  return {
    ...custom
  };
};
