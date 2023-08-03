import { singleton } from "tsyringe";
import {
  type ParamDomainArgModel
} from "../../model/param-domain/param-domain.model";
import { type ParamDomainDepArgsModel } from "@lib/param-domain";

@singleton()
/**
 * The service is responsible for checking value mode
 * for given argument.
 */
export class CheckArgumentService {
  valueMode (
    paramArg: ParamDomainArgModel,
    paramDomainDepArgs: ParamDomainDepArgsModel
  ): { success: boolean, error: string, index: number } {
    const arg = paramDomainDepArgs[paramArg.name];
    const { valueMode } = arg;
    if (valueMode === "empty" && paramArg.values.length !== 0) {
      return {
        success: false,
        error: `The ${arg.name} argument has to empty!`,
        index: paramArg.index
      };
    }
    if (valueMode === "single" && paramArg.values.length !== 1) {
      return {
        success: false,
        error: `The ${arg.name} argument has to single value!`,
        index: paramArg.index
      };
    }
    if (valueMode === "many" && paramArg.values.length === 0) {
      return {
        success: false,
        error: `The ${arg.name} argument has to multiple value!`,
        index: paramArg.index
      };
    }
    return { success: true, error: "", index: paramArg.index };
  }

  argumentValue (
    paramArg: ParamDomainArgModel,
    paramDomainDepArgs: ParamDomainDepArgsModel
  ): { success: boolean, error: string, index: number } {
    const arg = paramDomainDepArgs[paramArg.name];
    if (arg.values.length === 0) {
      return { success: true, error: "", index: paramArg.index };
    }
    const wrongValues = paramArg.values
      .filter((paramArg: any) => !arg.values.includes(paramArg));
    if (wrongValues.length === 0) {
      return { success: true, error: "", index: paramArg.index };
    }
    const errorValues = wrongValues.join(",");
    const supportedValues = arg.values.join(",");
    return {
      success: false,
      error: `The argument cannot contain values: ${errorValues},`
        .concat(`supported values are: ${supportedValues}`),
      index: paramArg.index
    };
  }
}
