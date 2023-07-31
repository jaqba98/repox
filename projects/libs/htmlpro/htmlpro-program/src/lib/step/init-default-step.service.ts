import { singleton } from "tsyringe";
import {
  DefaultDefaultHtmlProProgramModel,
  InitDefaultHtmlProProgramModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The list of steps for the program init default.
 */
export class InitDefaultStepService {
  runSteps(
    programModel: InitDefaultHtmlProProgramModel,
    commandModel: DefaultDefaultHtmlProProgramModel
  ): void {
  }
}
