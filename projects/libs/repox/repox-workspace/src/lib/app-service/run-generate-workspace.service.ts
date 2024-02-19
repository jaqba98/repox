import {container, singleton} from "tsyringe";

import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {changePath} from "@lib/utils";
import {WorkspaceFolderEnum} from "../enum/workspace-folder.enum";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class RunGenerateWorkspaceService {
    run(workspaceName: string): boolean {
        this.runGenerateWorkspace(WORKSPACE_STRUCTURE.structure, workspaceName);
        return true;
    }

    private runGenerateWorkspace(
        children: WorkspaceStructureBuilderModel[], workspaceName: string
    ): void {
        for (const child of children) {
            container.resolve(child.builder).generate(workspaceName);
            changePath(child.path);
            this.runGenerateWorkspace(child.children, workspaceName);
            if (child.path === ".") continue;
            changePath("../");
        }
    }
}
