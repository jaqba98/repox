import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder} from "@lib/utils";

@singleton()
/**
 * Create folder called apps.
 */
export class AppsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        createFolder("apps");
    }
}
