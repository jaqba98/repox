import {container, singleton} from "tsyringe";

import {changePath} from "@lib/utils";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {PROJECT_STRUCTURE} from "../const/project-structure.const";

@singleton()
/**
 * The app service uses recursion to generate project.
 */
export class RunGenerateProjectAppService {
    run(): boolean {
        this.runGenerateProject(PROJECT_STRUCTURE.structure);
        return true;
    }

    private runGenerateProject(children: WorkspaceStructureBuilderModel[]): void {
        for (const child of children) {
            container.resolve(child.builder).generate();
            changePath(child.path);
            this.runGenerateProject(child.children);
            if (child.path === ".") continue;
            changePath("../");
        }
    }
}
