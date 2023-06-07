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
 * for given arg-domain.
 */
export class CheckArgumentService {
  valueMode(
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

  argumentValue(
    paramArgs: ParamDomainArgModel,
    dependencyArgs: ParamDependencyArgsModel
  ): { success: boolean; error: string; index: number } {
    const arg = dependencyArgs[paramArgs.name];
    if (arg.values.length === 0) {
      return { success: true, error: "", index: paramArgs.index }
    }
    const wrongValues = paramArgs.values
      .filter(paramArg => !arg.values.includes(paramArg));
    if (wrongValues.length === 0) {
      return { success: true, error: "", index: paramArgs.index }
    }
    const errorValues = wrongValues.join(',');
    const supportedValues = arg.values.join(',');
    return {
      success: false,
      error: `The argument cannot contain values: ${errorValues}, supported values are: ${supportedValues}`,
      index: paramArgs.index
    }
  }
}
// todo: refactor