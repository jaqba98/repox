import {container, singleton} from "tsyringe";

import {changePath} from "@lib/utils";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {BASE_PROJECT_STRUCTURE} from "../const/base_project-structure.const";

@singleton()
/**
 * The app service uses recursion to generate project.
 */
export class RunGenerateProjectAppService {
    run(): boolean {
        this.runGenerateProject(BASE_PROJECT_STRUCTURE.structure);
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
