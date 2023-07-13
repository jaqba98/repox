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
  ProgramInstalledAppService
} from "../app-service/program-installed-app.service";
import { ProgramSystemEnum } from "../enum/program-system.enum";

@singleton()
/**
 * The list of steps for the program generate workspace.
 */
export class GenerateWorkspaceStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly programInstalled: ProgramInstalledAppService
    // private readonly systemVerification: SystemVerificationAppService,
    // private readonly generateWorkspace: GenerateWorkspaceAppService
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: GenerateWorkspaceRepoxCommandModel
  ): void {
    const { workspaceName } = commandModel;
    this.simpleMessage.writeInfo("Generate workspace", REPOX_LOGO);
    this.newline.writeNewline();
    this.programInstalled.run(ProgramSystemEnum.git);
    this.programInstalled.run(ProgramSystemEnum.node);
    this.programInstalled.run(ProgramSystemEnum.npm);
    // if (!this.systemVerification.run()) return;
    // this.generateWorkspace.generateWorkspace(commandModel);
  }
}
// todo: refactor
