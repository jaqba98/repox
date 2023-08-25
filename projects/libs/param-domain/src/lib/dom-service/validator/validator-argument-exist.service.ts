import { singleton } from "tsyringe";
import {
  type ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { type BaseGetParamDepModel } from "@lib/model";
import {
  type ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { BaseParamTypeEnum } from "../../enum/base-param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given arguments exist.
 */
export class ValidatorArgumentExistService
implements ValidatorDomainModel {
  constructor (
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator (
    getParamDepService: BaseGetParamDepModel
  ): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programArgs = paramDomain.program.args;
    const commandArgs = paramDomain.command.args;
    const args = [...programArgs, ...commandArgs];
    const wrongArgs = args
      .filter(arg => arg.name === BaseParamTypeEnum.unknown);
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      [`You have specified not existed arguments!`],
      [
        `You have to specify correct arguments.`,
        `Check the documentation to get full list of arguments.`
      ]
    );
  }
}
// todo: refactor the file
