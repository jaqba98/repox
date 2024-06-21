import { Config } from "jest";
import { singleton } from "tsyringe";

import { findAllFiles, readJsonFile, deepCopy } from "@lib/utils";

@singleton()
export class WorkspaceJestConfigService {
  getConfig(config: Config): Config {
    return {
      preset: "ts-jest",
      testEnvironment: "node",
      setupFilesAfterEnv: ["reflect-metadata"],
      testMatch: ["**/*.(spec|test).ts"],
      moduleNameMapper: this.buildModuleNameMapper(),
      ...deepCopy(config)
    };
  }

  private buildModuleNameMapper(): Config["moduleNameMapper"] {
    // TODO: change the strings to enum
    const projects = findAllFiles("./projects", "package.json")
      .map(project => readJsonFile(project));
    return {};
  }
}
