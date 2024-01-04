import {singleton} from "tsyringe";

import {createFolder} from "@lib/utils";
import {WorkspaceFolderEnum} from "../enum/workspace/workspace-folder.enum";

@singleton()
/**
 * The service is responsible for generating workspace folder structure.
 */
export class WorkspaceFolderStructureService {
    generateStructure(): boolean {
        createFolder(WorkspaceFolderEnum.projects);
        // todo: I am here 2
        return true;
    }
}
