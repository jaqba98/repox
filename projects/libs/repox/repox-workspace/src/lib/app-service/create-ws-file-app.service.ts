import {singleton} from "tsyringe";
import {
    WorkspaceFileEnum
} from "../enum/workspace/workspace-file.enum";
import {FileUtilsService, PathUtilsService} from "@lib/utils";
import {
    WorkspaceImportEnum
} from "../enum/workspace/workspace-import.enum";

@singleton()
/**
 * The service is responsible for building default content
 * for all workspace files.
 */
export class CreateWsFileAppService {
    constructor(
        private readonly pathUtils: PathUtilsService,
        private readonly fileUtils: FileUtilsService
    ) {
    }

    buildProjectTsconfigJsonContentFile(projectPath: string): string {
        const tsconfigRootPath = this.pathUtils.getRootPath(projectPath, WorkspaceFileEnum.tsconfigJsonFile);
        const content = {
            extends: tsconfigRootPath
        };
        return JSON.stringify(content, null, 2)
    }

    buildProjectJestConfigTsContentFile(projectPath: string): string {
        const jestRootPath = this.pathUtils.getRootPath(
            projectPath, WorkspaceImportEnum.importJestConfigTs
        );
        return `import config from "${jestRootPath}";

export default { ...config };
`;
    }
}

// todo: refactor the file
