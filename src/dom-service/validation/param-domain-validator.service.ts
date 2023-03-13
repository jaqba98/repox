import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  GetParamDependenceService
} from "../service/get-param-dependence.service";
import {
  BuildParamDomainValidationService
} from "../builder/build-param-domain-validation.service";

@singleton()
/**
 * The service is responsible for verify
 * the parameter domain model.
 */
export class ParamDomainValidatorService {
  constructor(
    private readonly getParamDependence: GetParamDependenceService,
    private readonly buildParam: BuildParamDomainValidationService
  ) {
  }

  runValidation(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    const program = this.getParamDependence
      .getParamDependence(paramDomain.program.name);
    if (!program) {
      return this.buildParam.paramDomainValidationError(
        [paramDomain.program.index],
        ["You have specified not existed program!"],
        [
          "You have to specify correct program name.",
          "Check the documentation to get full list of programs."
        ],
        paramDomain
      );
    }
    const command = program.commands[paramDomain.command.name];
    if (!command) {
      return this.buildParam.paramDomainValidationError(
        [],
        ["You have specified not exist command for given program!"],
        [
          "You have to specify correct command name.",
          "Check the documentation to get full list of commands."
        ],
        paramDomain
      );
    }
    const missingProgramArgs = Object.values(program.args)
      .filter(arg => arg.required)
      .filter(arg => !paramDomain.program.args.find(
        cmdArg => cmdArg.name === arg.argName
      ))
      .map(arg => arg.argName);
    if (missingProgramArgs.length > 0) {
      return this.buildParam.paramDomainValidationError(
        [],
        ["You have not specified required arguments for program!"],
        [
          "You have to specify all required arguments.",
          `Missing arguments: ${missingProgramArgs.join(",")}`
        ],
        paramDomain
      );
    }
    const missingCommandsArgs = Object.values(command.args)
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
    return this.buildParam.paramDomainValidationSuccess(paramDomain);
  }
}
