import {singleton} from "tsyringe";

import {WorkspaceStructureActionsModel} from "../model/workspace/workspace-structure.model";
import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";
import {createPath} from "@lib/utils";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    private path: string = "";

    generate(): boolean {
        this.path = "";
        return this.runGenerate(WORKSPACE_STRUCTURE.structure);
    }

    private runGenerate(actions: WorkspaceStructureActionsModel[]): boolean {
        // todo: I am here
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    this.path = createPath(this.path, action.folderName);
                    console.log(this.path);
                    if (action.subFolders.length > 0) this.runGenerate(action.subFolders);
                    break;
                case WorkspaceActionEnum.createFile:
                    this.path = createPath(this.path, action.fileName);
                    console.log(this.path);
                    this.path = createPath(this.path, "../");
                    break;
                default:
                    throw new Error("Not supported generate action!");
            }
        }
        this.path = createPath(this.path, "../");
        return true;
    }
}
