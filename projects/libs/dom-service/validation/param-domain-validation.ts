import { container, singleton } from "tsyringe";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../parameter/src/model/param-domain/param-domain-validation.model";
import {
  ValidatorDomainModel
} from "../../parameter/src/model/validator/validator-domain.model";
import { ProgramExistValidator } from "./program-exist-validator";
import { CommandExistValidator } from "./command-exist-validator";
import {
  ProgramContainsCommandValidator
} from "./program-contains-command-validator";
import { ArgumentExistValidator } from "./argument-exist-validator";
import {
  CommandContainsArguments
} from "./command-contains-arguments";
import {
  ProgramContainsArguments
} from "./program-contains-arguments";
import {
  ProgramNotContainsWrongArguments
} from "./program-not-contains-wrong-arguments";
import {
  CommandNotContainsWrongArguments
} from "./command-not-contains-wrong-arguments";
import { CommandArgumentsCorrect } from "./command-arguments-correct";
import { ProgramArgumentsCorrect } from "./program-arguments-correct";

/**
 * Run all validators to verify the parameter domain model.
 *
 * Validators:
 * 1.Verify that command exists.
 * 2.Verify that command exists.
 * 3.Verify that command contains command.
 * 4.Verify that arguments exist.
 * 5.Verify that command contains arguments.
 * 6.Verify that command contains arguments.
 * 7.Verify that command does not contain wrong arguments.
 * 8.Verify that command does not contain wrong arguments.
 */
@singleton()
export class ParamDomainValidation {
  constructor(
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidation(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    const services = [
      ProgramExistValidator,
      CommandExistValidator,
      ProgramContainsCommandValidator,
      ArgumentExistValidator,
      ProgramContainsArguments,
      CommandContainsArguments,
      ProgramNotContainsWrongArguments,
      CommandNotContainsWrongArguments,
      ProgramArgumentsCorrect,
      CommandArgumentsCorrect
    ];
    let isError: boolean = false;
    let result = undefined;
    for (const service of services) {
      if (!isError) {
        const srv = container.resolve<ValidatorDomainModel>(service);
        result = srv.runValidator(paramDomain);
        if (!result.success) {
          isError = true;
        }
      }
    }
    return result || this.buildParamDomain.buildSuccess(paramDomain);
  }
}
