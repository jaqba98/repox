import { container, singleton } from "tsyringe";
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
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain.model";

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
    const command = program?.commands[paramDomain.command.name];
    const error = this.getAllValidators()
      .map(validator => validator.runValidator(paramDomain, program, command))
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
    ].map(validator =>
      container.resolve<ValidatorDomainModel>(validator)
    );
  }
}
// todo: refactor