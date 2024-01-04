import {singleton} from "tsyringe";

import {createFolder} from "@lib/utils";
import {WorkspaceFolderEnum} from "../enum/workspace/workspace-folder.enum";

@singleton()
/**
 * The service is responsible for generating workspace folder structure.
 */
export class WorkspaceFolderStructureService {
    generateStructure(): boolean {
        if (!createFolder(WorkspaceFolderEnum.projects)) return false;
        if (!createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.apps)) return false;
        if (!createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.libs)) return false;
        return !!createFolder(WorkspaceFolderEnum.projects, WorkspaceFolderEnum.tools);
    }
}

// todo: done