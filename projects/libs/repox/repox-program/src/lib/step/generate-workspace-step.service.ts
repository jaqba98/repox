import { singleton } from "tsyringe";
import {
  EmptyRepoxProgramModel,
  GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  FolderNotExistAppService
} from "../app-service/folder-not-exist-app.service";
import {
  CreateWsStructureAppService
} from "../app-service/create-ws-structure-app.service";
import {
  InitWsProjectAppService
} from "../app-service/init-ws-project-app.service";
import {
  AllProgramInstalledService
} from "../compose/all-program-installed.service";

@singleton()
/**
 * The list of steps for the program generate workspace.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly allProgramInstalled: AllProgramInstalledService,
    private readonly folderNotExist: FolderNotExistAppService,
    private readonly createWsStructure: CreateWsStructureAppService,
    private readonly initWsProject: InitWsProjectAppService
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: GenerateWorkspaceRepoxCommandModel
  ): void {
    const { workspaceName } = commandModel;
    this.simpleMessage.writeInfo("Generate workspace", REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.allProgramInstalled.run()) return;
    if (!this.folderNotExist.run(workspaceName)) return;
    if (!this.createWsStructure.run(workspaceName)) return;
    if (!this.initWsProject.run()) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(
      "Workspace generated successfully!"
    );
  }
}
