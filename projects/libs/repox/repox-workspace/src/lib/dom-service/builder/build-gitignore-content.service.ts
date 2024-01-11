import {singleton} from "tsyringe";

import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";

@singleton()
/**
 * The service is responsible for building the .gitignore content file.
 */
export class BuildGitignoreContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(): string {
        return `# JetBrains tools
.idea/

# Compilation output
dist/

# Dependency directories
node_modules/

# Temporary files and directories
tmp/
`;
    }
}

// todo: done