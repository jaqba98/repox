import {singleton} from "tsyringe";

import {createFolder} from "@lib/utils";
import {WorkspaceFolderEnum} from "../enum/workspace/workspace-folder.enum";

@singleton()
/**
 * The service is responsible for generating workspace folder structure.
 */
export class WorkspaceFolderStructureService {
    generateStructure(): boolean {
        return this.generateStructure2_0_0();
    }

    private generateStructure2_0_0(): boolean {
        if (!createFolder(WorkspaceFolderEnum.projects)) return false;
        if (!createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.apps)) return false;
        if (!createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.libs)) return false;
        return createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.tools);
        // todo: I am here 2
    }
}
