import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {SystemProgramEnum, SystemProgramExistService} from "@lib/program-step";
import {pathExist, removeFile} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building the .gitignore content file.
 */
export class BuildGitignoreContentService implements WorkspaceContentBuilderModel {
    constructor(private readonly systemProgramExist: SystemProgramExistService) {
    }

    checkBeforeBuildContent(path: string): boolean {
        if (pathExist(path)) removeFile(path);
        return this.systemProgramExist.checkExist(SystemProgramEnum.git);
    }

    buildContent(): string {
        return `# JetBrains tools
.idea/

# Compilation output
**/dist/**

# Dependency directories
**/node_modules/**

# Temporary files and directories
**/tmp/**
`;
    }
}

