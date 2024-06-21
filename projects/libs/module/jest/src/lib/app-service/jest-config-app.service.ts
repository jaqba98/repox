import { Config } from "jest";
import { container, singleton } from "tsyringe";

import {
  WorkspaceJestConfigService
} from "../dom-service/workspace-jest-config.service";

@singleton()
class JestConfigAppService {
  constructor(
    private readonly workspace: WorkspaceJestConfigService
  ) {}

  workspaceJestConfig(config: Config): Config {
    return this.workspace.getConfig(config);
  }

  projectJestConfig(config: Config): Config {
    return {};
  }
}

export const workspaceJestConfig = (config: Config): Config => {
  return container
    .resolve(JestConfigAppService)
    .workspaceJestConfig(config);
};

export const projectJestConfig = (config: Config): Config => {
  return container
    .resolve(JestConfigAppService)
    .projectJestConfig(config);
};
