import { container, singleton } from "tsyringe";

import { changePath } from "@lib/utils";

import { WORKSPACE_STRUCTURE } from "../const/workspace-structure.const";
import {
    type WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";

@singleton()
/**
 * The app service uses recursion to regenerate workspace.
 */
export class RunRegenerateWorkspaceAppService {
    run (): boolean {
        this.runRegenerateWorkspace(WORKSPACE_STRUCTURE.structure);
        return true;
    }

    private runRegenerateWorkspace (children: WorkspaceStructureBuilderModel[]): void {
        for (const child of children) {
            container.resolve(child.builder).regenerate();
            changePath(child.path);
            this.runRegenerateWorkspace(child.children);
            if (child.path === ".") continue;
            changePath("../");
        }
    }
}
