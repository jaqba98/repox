import { singleton } from "tsyringe";
import {
  ParamDomainStoreService
} from "../dom-service/store/param-domain-store.service";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../model/param-domain/param-domain-validation.model";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The app service is responsible for give param domain data
 * for other projects.
 */
export class ParamDomainAppService {
  constructor(
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  getParamDomain(): ParamDomainModel {
    return this.paramDomainStore.getParamDomain();
  }

  getParamDomainValidation(): ParamDomainValidationModel {
    return this.paramDomainStore.getParamDomainValidation();
  }

  getProgramName(): string {
    return this.paramDomainStore.getParamDomain().program.name;
  }

  getCommandName(): string {
    return this.paramDomainStore.getParamDomain().command.name;
  }

  getProgramBooleanValue(argument: string): boolean {
    return this.paramDomainStore.getParamDomain().program.args
      .some(param => param.name === argument);
  }

  getCommandStringValue(
    argument: string, defaultValue: string = EMPTY_STRING
  ): string {
    const argumentValue = this.paramDomainStore.getParamDomain()
      .command.args.find(param => param.name === argument);
    if (argumentValue === undefined) {
      return defaultValue;
    }
    const value = argumentValue.values.at(0);
    return value ? value : defaultValue;
  }
}
