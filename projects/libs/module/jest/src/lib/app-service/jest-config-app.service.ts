import "reflect-metadata";
import { Config } from "jest";

import {
  defaultConfig
} from "../dom-service/jest-config.service";
import {
  moduleNameMapper
} from "../infrastructure/module-name-mapper.service";

export const repoxJestConfig = (customConfig: Config = {}): Config => {
  return {
    ...defaultConfig(),
    ...moduleNameMapper(),
    ...customConfig
  };
};
