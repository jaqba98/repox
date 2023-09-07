import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  ChangePathAppService,
  CreateFolderAppService,
  FolderNotExistAppService, RunCommandAppService,
  SystemProgramEnum,
  SystemProgramExistAppService
} from "@lib/program-step";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import {
  EmptyRepoxProgramModel,
  GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the program generate workspace.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly systemProgramExist: SystemProgramExistAppService,
    private readonly folderNotExist: FolderNotExistAppService,
    private readonly createFolder: CreateFolderAppService,
    private readonly changePath: ChangePathAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService,
    private readonly runCommand: RunCommandAppService
  ) {
  }

  runSteps(
    _programModel: EmptyRepoxProgramModel,
    commandModel: GenerateWorkspaceRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo(`Generate workspace`, REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
    const { workspaceName } = commandModel;
    if (!this.folderNotExist.run(workspaceName)) return;
    if (!this.createFolder.run(workspaceName)) return;
    if (!this.changePath.run(workspaceName)) return;
    if (!this.generateWorkspace.run()) return;
    if (!this.runCommand.run(`git init`)) return;
    if (!this.runCommand.run(`git config core.autocrlf`)) return;
    if (!this.runCommand.run(`git add .`)) return;
    if (!this.runCommand.run(`git commit -m "init commit"`)) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(`Command executed correctly`);
  }
}
