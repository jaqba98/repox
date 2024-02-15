import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {createFolder} from "@lib/utils";

@singleton()
/**
 * Create folder called libs.
 */
export class LibsFolderBuilder extends WorkspaceStructureAbstractBuilder {
    build() {
        createFolder("libs");
    }
}
