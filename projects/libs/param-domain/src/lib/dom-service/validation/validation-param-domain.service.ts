import { container, singleton } from "tsyringe";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import {
  ValidatorProgramExistService
} from "../validator/validator-program-exist.service";
import {
  ValidatorCommandExistService
} from "../validator/validator-command-exist.service";
import {
  ValidatorProgramContainsCommandService
} from "../validator/validator-program-contains-command.service";
import {
  ValidatorArgumentExistService
} from "../validator/validator-argument-exist.service";
import { BaseGetParamDepModel } from "@lib/model";
import {
  ValidatorProgramContainsArgumentsService
} from "../validator/validator-program-contains-arguments.service";
import {
  ValidatorCommandContainsArgumentsService
} from "../validator/validator-command-contains-arguments.service";
import {
  ValidatorProgramNotWrongArgumentsService
} from "../validator/validator-program-not-wrong-arguments.service";
import {
  CommandNotWrongArgumentsService
} from "../validator/command-not-wrong-arguments.service";
import {
  ValidatorProgramArgumentsCorrectService
} from "../validator/validator-program-arguments-correct.service";
import {
  ValidatorCommandArgumentsCorrectService
} from "../validator/validator-command-arguments-correct.service";
import {
  ValidatorProgramArgIsCorrectValueService
} from "../validator/validator-program-arg-is-correct-value.service";
import {
  ValidatorCommandArgIsCorrectValueService
} from "../validator/validator-command-arg-is-correct-value.service";

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
 * 11.Verify that program arguments have correct value.
 * 12.Verify that command arguments have correct value.
 */
export class ValidationParamDomainService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidation(
    getParamDependency: BaseGetParamDepModel
  ): void {
    for (const service of this.getValidators()) {
      const result = service.runValidator(getParamDependency);
      if (!result.success) {
        this.paramDomainStore.setParamDomainValidation(result);
        return;
      }
    }
    const success = this.buildParamDomain.buildSuccess();
    this.paramDomainStore.setParamDomainValidation(success);
  }

  private getValidators(): Array<ValidatorDomainModel> {
    return [
      ValidatorProgramExistService,
      ValidatorCommandExistService,
      ValidatorProgramContainsCommandService,
      ValidatorArgumentExistService,
      ValidatorProgramContainsArgumentsService,
      ValidatorCommandContainsArgumentsService,
      ValidatorProgramNotWrongArgumentsService,
      CommandNotWrongArgumentsService,
      ValidatorProgramArgumentsCorrectService,
      ValidatorCommandArgumentsCorrectService,
      ValidatorProgramArgIsCorrectValueService,
      ValidatorCommandArgIsCorrectValueService
    ].map(service => {
      return container.resolve<ValidatorDomainModel>(service);
    });
  }
}
// todo: refactor
