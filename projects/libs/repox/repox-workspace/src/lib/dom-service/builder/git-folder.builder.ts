import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {runCommand} from "@lib/utils";

@singleton()
/**
 * Create folder called .git with content.
 */
export class GitFolderBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        runCommand("git init");
    }

    regenerate() {
    }
}
