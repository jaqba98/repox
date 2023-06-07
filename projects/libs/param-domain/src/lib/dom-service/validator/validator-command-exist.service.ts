import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { CommandEnum } from "../../enum/command.enum";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";

@singleton()
/**
 * The validator is responsible for checking
 * that given command exist.
 */
export class ValidatorCommandExistService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator(): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    if (paramDomain.command.name === CommandEnum.unknown) {
      return this.buildParamDomain.buildError(
        [paramDomain.command.index],
        ["You have specified not existed command!"],
        [
          "You have to specify correct command name.",
          "Check the documentation to get full list of commands."
        ]
      );
    }
    return this.buildParamDomain.buildSuccess();
  }
}
