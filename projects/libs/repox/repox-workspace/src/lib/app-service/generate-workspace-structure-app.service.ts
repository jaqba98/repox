import {singleton} from "tsyringe";

import {WorkspaceStructureActionsModel} from "../model/workspace/workspace-structure.model";
import {WORKSPACE_STRUCTURE} from "../const/workspace-structure.const";
import {WorkspaceActionEnum} from "../enum/workspace/workspace-action.enum";

@singleton()
/**
 * The service uses recursion to generate workspace.
 */
export class GenerateWorkspaceStructureAppService {
    generate(): boolean {
        return this.runGenerate(WORKSPACE_STRUCTURE.structure);
    }

    private runGenerate(actions: WorkspaceStructureActionsModel[]): boolean {
        // I am here
        for (const action of actions) {
            switch (action.action) {
                case WorkspaceActionEnum.createFolder:
                    console.log(action.folderName);
                    if (action.subFolders.length > 0) {
                        this.runGenerate(action.subFolders);
                    }
                    break;
                case WorkspaceActionEnum.createFile:
                    console.log(action.fileName);
                    break;
            }
        }
        return true;
    }
}
