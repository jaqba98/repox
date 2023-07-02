import { singleton } from "tsyringe";
import {
  ParamDomainArgModel
} from "../../model/param-domain/param-domain.model";
import { ParamDomainDepArgsModel } from "@lib/param-domain";

@singleton()
/**
 * The service is responsible for check value mode
 * for given argument.
 */
export class CheckArgumentService {
  valueMode(
    domainArg: ParamDomainArgModel,
    dependencyArgs: ParamDomainDepArgsModel
  ): { success: boolean; error: string; index: number } {
    const arg = dependencyArgs[domainArg.name];
    const { valueMode } = arg;
    if (valueMode === "empty" && domainArg.values.length !== 0) {
      return {
        success: false,
        error: `The ${arg.name} argument has to empty!`,
        index: domainArg.index
      }
    }
    if (valueMode === "single" && domainArg.values.length !== 1) {
      return {
        success: false,
        error: `The ${arg.name} argument has to single value!`,
        index: domainArg.index
      }
    }
    if (valueMode === "many" && domainArg.values.length <= 1) {
      return {
        success: false,
        error: `The ${arg.name} argument has to multiple value!`,
        index: domainArg.index
      }
    }
    return { success: true, error: "", index: domainArg.index }
  }

  argumentValue(
    domainArgs: ParamDomainArgModel,
    dependencyArgs: ParamDomainDepArgsModel
  ): { success: boolean; error: string; index: number } {
    const arg = dependencyArgs[domainArgs.name];
    if (arg.values.length === 0) {
      return { success: true, error: "", index: domainArgs.index }
    }
    const wrongValues = domainArgs.values
      .filter((paramArg: any) => !arg.values.includes(paramArg));
    if (wrongValues.length === 0) {
      return { success: true, error: "", index: domainArgs.index }
    }
    const errorValues = wrongValues.join(',');
    const supportedValues = arg.values.join(',');
    return {
      success: false,
      error: `The argument cannot contain values: ${errorValues},`
        .concat(`supported values are: ${supportedValues}`),
      index: domainArgs.index
    }
  }
}
