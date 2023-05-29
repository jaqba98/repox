import { singleton } from "tsyringe";
import { GenerateProjectCommandArgModel } from "@lib/param-domain";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  runSteps(commandModel: GenerateProjectCommandArgModel): boolean {
    return true;
  }
}
