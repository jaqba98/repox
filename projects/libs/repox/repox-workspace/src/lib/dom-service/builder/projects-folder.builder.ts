import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder} from "@lib/utils";

@singleton()
/**
 * Create folder called projects.
 */
export class ProjectsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        createFolder("projects");
    }
}
