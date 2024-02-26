import {container, singleton} from "tsyringe";

import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {changePath} from "@lib/utils";

@singleton()
/**
 * The service uses recursion to regenerate workspace.
 */
export class RunRegenerateWorkspaceService {
    run(): boolean {
        this.runRegenerateWorkspace(WORKSPACE_STRUCTURE.structure);
        return true;
    }

    private runRegenerateWorkspace(children: WorkspaceStructureBuilderModel[]): void {
        for (const child of children) {
            container.resolve(child.builder).regenerate();
            changePath(child.path);
            this.runRegenerateWorkspace(child.children);
            if (child.path === ".") continue;
            changePath("../");
        }
    }
}
