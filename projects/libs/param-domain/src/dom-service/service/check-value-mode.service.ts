import {
  ParamDomainArgModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDependencyArgsModel
} from "../../model/param-domain/param-dependency.model";
import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for check value mode
 * for given argument.
 */
export class CheckValueModeService {
  check(
    programArg: ParamDomainArgModel,
    dependencyArgs: ParamDependencyArgsModel
  ): { success: boolean; error: string; index: number } {
    const arg = dependencyArgs[programArg.name];
    if (arg.valueMode === "empty" && programArg.values.length !== 0) {
      return {
        success: false,
        error: `The ${arg.name} argument has to empty!`,
        index: programArg.index
      }
    }
    if (arg.valueMode === "single" && programArg.values.length !== 1) {
      return {
        success: false,
        error: `The ${arg.name} argument has to single value!`,
        index: programArg.index
      }
    }
    if (arg.valueMode === "many" && programArg.values.length <= 1) {
      return {
        success: false,
        error: `The ${arg.name} argument has to multiple value!`,
        index: programArg.index
      }
    }
    return { success: true, error: "", index: programArg.index }
  }
}
