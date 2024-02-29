import {container, singleton} from "tsyringe";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {changePath} from "@lib/utils";
import {PROJECT_STRUCTURE} from "../const/project-structure.const";

@singleton()
/**
 * The service uses recursion to generate project.
 */
export class RunGenerateProjectService {
    run(): boolean {
        this.runGenerateWorkspace(PROJECT_STRUCTURE.structure);
        return true;
    }

    private runGenerateWorkspace(children: WorkspaceStructureBuilderModel[]): void {
        for (const child of children) {
            container.resolve(child.builder).generate();
            changePath(child.path);
            this.runGenerateWorkspace(child.children);
            if (child.path === ".") continue;
            changePath("../");
        }
    }
}
