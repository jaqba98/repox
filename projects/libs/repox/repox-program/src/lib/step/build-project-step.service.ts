import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  BuildProjectRepoxCommandModel,
  EmptyRepoxProgramModel
} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program build project.
 */
export class BuildProjectStepService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService
  ) {
  }

  runSteps(
    programModel: EmptyRepoxProgramModel,
    commandModel: BuildProjectRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo("Build project", REPOX_LOGO);
    this.newline.writeNewline();
  }
}
// todo: refactor
