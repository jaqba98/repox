import { singleton } from "tsyringe";
import {
  type WsProjectTsconfigDtoModel
} from "../model/ws-dto/ws-tsconfig-dto.model";
import {
  WorkspaceFileEnum
} from "../enum/workspace/workspace-file.enum";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  WorkspaceImportEnum
} from "../enum/workspace/workspace-import.enum";

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
