import { container, singleton } from "tsyringe";
import {
  GetParamDependenceService
} from "../service/get-param-dependence.service";
import {
  BuildParamDomainValidationService
} from "../builder/build-param-domain-validation.service";
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
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import {
  ProgramExistValidatorService
} from "../validator/program-exist-validator.service";
import {
  CommandExistValidatorService
} from "../validator/command-exist-validator.service";
import {
  ProgramArgsValidatorService
} from "../validator/program-args-validator.service";
import {
  CommandArgsValidatorService
} from "../validator/command-args-validator.service";

@singleton()
/**
 * The service is responsible for verify the parameter config model.
 */
export class ParamDomainValidationService {
  constructor(
    private readonly getParamDependence: GetParamDependenceService,
    private readonly buildParam: BuildParamDomainValidationService
  ) {
  }

  runValidation(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    const paramDep: ParamDependencyModel = this.getParamDependence
      .getParamDependence(paramDomain.program.name);
    const command = paramDep.commands[paramDomain.command.name];
    const error = this.getAllValidators()
      .map(validator => {
        return validator.runValidator(paramDomain, paramDep, command);
      })
      .find(result => result.isError);
    return error ?
      error :
      this.buildParam.paramDomainValidationSuccess(paramDomain);
  }

  private getAllValidators(): Array<ValidatorDomainModel> {
    return [
      ProgramExistValidatorService,
      CommandExistValidatorService,
      ProgramArgsValidatorService,
      CommandArgsValidatorService
    ].map(validator => {
      return container.resolve<ValidatorDomainModel>(validator);
    });
  }
}
