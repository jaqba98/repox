import type { Config } from "jest";

import workspaceJestConfig from "../../../jest.config";

const config: Config = {
  ...workspaceJestConfig
};

export default config;
