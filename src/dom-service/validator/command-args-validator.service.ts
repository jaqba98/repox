import { singleton } from "tsyringe";
import {
  BuildParamDomainValidationService
} from "../builder/build-param-domain-validation.service";
import {
  GetParamDependenceService
} from "../service/get-param-dependence.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain.model";
import {
  ParamDependencyCommandModel,
  ParamDependencyCommandsModel,
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters are in correct order.
 */
export class CommandArgsValidatorService
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependence: GetParamDependenceService,
    private readonly buildParam: BuildParamDomainValidationService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
    program: ParamDependencyModel | undefined,
    command: ParamDependencyCommandModel | undefined
  ): ParamDomainValidationModel {
    const commandArgs = command?.args ?? {};
    const missingCommandsArgs = Object.values(commandArgs)
      .filter(arg => arg.required)
      .filter(arg => !paramDomain.command.args.find(
        cmdArg => cmdArg.name === arg.argName
      ))
      .map(arg => arg.argName);
    if (missingCommandsArgs.length > 0) {
      return this.buildParam.paramDomainValidationError(
        [],
        ["You have not specified required arguments for command!"],
        [
          "You have to specify all required arguments.",
          `Missing arguments: ${missingCommandsArgs.join(",")}`
        ],
        paramDomain
      );
    }
    const existedCommandArgs = Object.values(commandArgs).map(arg => arg.argName);
    const notExistedCommandArgs = paramDomain.command.args
      .filter(arg => !existedCommandArgs.includes(arg.name))
      .map(arg => arg.index);
    if (notExistedCommandArgs.length > 0) {
      return this.buildParam.paramDomainValidationError(
        notExistedCommandArgs,
        ["You have specified not existed arguments for command!"],
        ["You have to specify only existed arguments."],
        paramDomain
      );
    }
    return this.buildParam.paramDomainValidationSuccess(paramDomain);
  }
}
// todo: refactor