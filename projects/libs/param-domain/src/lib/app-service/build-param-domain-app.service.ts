import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  BaseGetParamDependencyModel,
  KeyValueModel
} from "@lib/model";
import {
  ValidationParamDomainService
} from "../dom-service/validation/validation-param-domain.service";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly validation: ValidationParamDomainService
  ) {
  }

  build(
    programEnums: Array<KeyValueModel>,
    programAliasEnums: Array<KeyValueModel>,
    commandEnums: Array<KeyValueModel>,
    commandAliasEnums: Array<KeyValueModel>,
    argumentEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>,
    getParamDependency: BaseGetParamDependencyModel
  ): void {
    this.buildParamDomain.build(
      programEnums,
      programAliasEnums,
      commandEnums,
      commandAliasEnums,
      argumentEnums,
      aliasEnums
    );
    this.validation.runValidation(getParamDependency);
  }
}
// todo: refactor