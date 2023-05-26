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
import {
  ProgramContainsCommandValidatorService
} from "./program-contains-command-validator.service";
import {
  ArgumentExistValidatorService
} from "./argument-exist-validator.service";
import {
  ProgramContainsArgumentsService
} from "./program-contains-arguments.service";
import {
  CommandContainsArgumentsService
} from "./command-contains-arguments.service";
import {
  ProgramNotContainsWrongArgumentsService
} from "./program-not-contains-wrong-arguments.service";
import {
  CommandNotContainsWrongArgumentsService
} from "./command-not-contains-wrong-arguments.service";
import {
  ProgramArgumentsCorrectService
} from "./program-arguments-correct.service";
import {
  CommandArgumentsCorrectService
} from "./command-arguments-correct.service";

@singleton()
/**
 * Run all validators to verify the parameter domain model.
 *
 * Validators:
 * 1.Verify that program exists.
 * 2.Verify that command exists.
 * 3.Verify that program contains command.
 * 4.Verify that arguments exist.
 * 5.Verify that program contains arguments.
 * 6.Verify that command contains arguments.
 * 7.Verify that program does not contain wrong arguments.
 * 8.Verify that command does not contain wrong arguments.
 * 9.Verify that program arguments are correctly.
 * 10.Verify that command arguments are correctly.
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
      ProgramContainsCommandValidatorService,
      ArgumentExistValidatorService,
      ProgramContainsArgumentsService,
      CommandContainsArgumentsService,
      ProgramNotContainsWrongArgumentsService,
      CommandNotContainsWrongArgumentsService,
      ProgramArgumentsCorrectService,
      CommandArgumentsCorrectService
    ].map(service => {
      return container.resolve<ValidatorDomainModel>(service);
    });
  }
}
