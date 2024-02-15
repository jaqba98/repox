import {container, singleton} from "tsyringe";

import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace-structure.model";
import {changePath} from "@lib/utils";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class RunGenerateWorkspaceService {
    run(): boolean {
        this.runGenerateWorkspace(WORKSPACE_STRUCTURE.structure);
        return true;
    }

    private runGenerateWorkspace(children: WorkspaceStructureBuilderModel[]): void {
        for (const child of children) {
            container.resolve(child.builder).build();
            changePath(child.path);
            this.runGenerateWorkspace(child.children);
            changePath("../");
        }
    }
}
