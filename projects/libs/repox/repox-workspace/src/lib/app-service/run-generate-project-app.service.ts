import {container, singleton} from "tsyringe";

import {changePath} from "@lib/utils";
import {
    WorkspaceStructureBuilderModel
} from "../model/workspace/workspace-structure.model";
import {APP_TYPESCRIPT_PROJECT_STRUCTURE} from "../const/base_project-structure.const";

@singleton()
/**
 * The app service uses recursion to generate project.
 */
export class RunGenerateProjectAppService {
    run(name: string, path: string, type: string): boolean {
        if (type === "@app/ts") {
            this.runGenerateProject(APP_TYPESCRIPT_PROJECT_STRUCTURE.structure);
            return true;
        }
        return false;
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
