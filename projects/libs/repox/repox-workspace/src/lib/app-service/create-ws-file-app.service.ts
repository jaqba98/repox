import { singleton } from "tsyringe";
import { type WsRepoxDtoModel } from "../model/ws-dto/ws-repox-dto.model";
import {
  type WsProjectTsconfigDtoModel,
  type WsTsconfigDtoModel
} from "../model/ws-dto/ws-tsconfig-dto.model";
import {
  WorkspaceFileEnum
} from "../enum/workspace/workspace-file.enum";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  WorkspaceImportEnum
} from "../enum/workspace/workspace-import.enum";
import {
  WsPackageJsonDtoModel
} from "../model/ws-dto/ws-package-json-dto.model";

@singleton()
/**
 * The service is responsible for building default content
 * for all workspace files.
 */
export class CreateWsFileAppService {
  constructor (
    private readonly pathUtils: PathUtilsService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  buildDefaultRootJestConfigTsContentFile (): string {
    return `import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ["core-js/features/reflect"],
  testEnvironment: "jest-environment-node"
};

export default config;
`;
  }

  buildProjectTsconfigJsonContentFile (
    projectPath: string
  ): WsProjectTsconfigDtoModel {
    const tsconfigRootPath = this.pathUtils.getRootPath(
      projectPath, WorkspaceFileEnum.tsconfigJson
    );
    return {
      extends: tsconfigRootPath
    };
  }

  buildProjectJestConfigTsContentFile (projectPath: string): string {
    const jestRootPath = this.pathUtils.getRootPath(
      projectPath, WorkspaceImportEnum.importJestConfigTs
    );
    return `import config from "${jestRootPath}";

export default { ...config };
`;
  }
}
// todo: refactor the file
