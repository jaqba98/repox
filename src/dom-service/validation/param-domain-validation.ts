import { container, singleton } from "tsyringe";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation-model";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain-model";
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
 * 1.Verify that program exists.
 * 2.Verify that command exists.
 * 3.Verify that program contains command.
 * 4.Verify that arguments exist.
 * 5.Verify that program contains arguments.
 * 6.Verify that command contains arguments.
 * 7.Verify that program does not contain wrong arguments.
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
    const paramDomainError: ParamDomainValidationModel | undefined = [
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
    ]
      .map(service => {
        return container.resolve<ValidatorDomainModel>(service);
      })
      .map(service => service.runValidator(paramDomain))
      .find(result => !result.success);
    return paramDomainError ||
      this.buildParamDomain.buildSuccess(paramDomain);
  }
}
