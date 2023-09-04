import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import {
  CheckForceModeAppService,
  SystemProgramEnum,
  SystemProgramExistAppService
} from "@lib/program-step";
import {
  GenerateWorkspaceAppService
} from "../app-service/generate-workspace-app.service";
import {
  EmptyRepoxProgramModel,
  RegenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";

@singleton()
/**
 * The list of steps for the program regenerate workspace.
 */
export class RegenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly systemProgramExist: SystemProgramExistAppService,
    private readonly checkForceMode: CheckForceModeAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService
  ) {
  }

  runSteps(
    _programModel: EmptyRepoxProgramModel,
    commandModel: RegenerateWorkspaceRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo(`Regenerate workspace`, REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
    if (!this.checkForceMode.run(commandModel.isForceMode)) return;
    if (!this.generateWorkspace.run()) return;
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(`Command executed correctly`);
  }
}
