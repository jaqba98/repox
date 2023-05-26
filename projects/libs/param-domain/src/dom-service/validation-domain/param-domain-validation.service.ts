import { container, singleton } from "tsyringe";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  ProgramExistValidatorService
} from "./program-exist-validator.service";
import {
  CommandExistValidatorService
} from "./command-exist-validator.service";

@singleton()
/**
 * Run all validators to verify the parameter domain model.
 *
 * Validators:
 * 1.Verify that program exists.
 * 2.Verify that command exists.
 * 3.Verify that program contains program.
 * 4.Verify that arguments exist.
 * 5.Verify that program contains arguments.
 * 6.Verify that program contains arguments.
 * 7.Verify that program does not contain wrong arguments.
 * 8.Verify that program does not contain wrong arguments.
 */
export class ParamDomainValidationService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService
  ) {
  }

  runValidation(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    for (const service of this.getValidators()) {
      const result = service.runValidator(paramDomain);
      if (!result.success) return result;
    }
    return this.buildParamDomain.buildSuccess(paramDomain);
  }

  private getValidators(): Array<ValidatorDomainModel> {
    return [
      ProgramExistValidatorService,
      CommandExistValidatorService,
      // ProgramContainsCommandValidatorService,
      // ArgumentExistValidatorService,
      // ProgramContainsArgumentsService,
      // CommandContainsArgumentsService,
      // ProgramNotContainsWrongArgumentsService,
      // CommandNotContainsWrongArgumentsService,
      // ProgramArgumentsCorrectService,
      // CommandArgumentsCorrectService
    ].map(service => {
      return container.resolve<ValidatorDomainModel>(service);
    });
  }
}
