import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ValidationParamDomainService
} from "../dom-service/validation/validation-param-domain.service";
import { BaseGetParamDepModel, KeyValueModel } from "@lib/model";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly validationParamDom: ValidationParamDomainService
  ) {
  }

  build(
    programEnums: Array<KeyValueModel>,
    programAliasEnums: Array<KeyValueModel>,
    commandEnums: Array<KeyValueModel>,
    commandAliasEnums: Array<KeyValueModel>,
    argumentEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>,
    getParamDepService: BaseGetParamDepModel
  ): void {
    this.buildParamDomain.build(
      programEnums,
      programAliasEnums,
      commandEnums,
      commandAliasEnums,
      argumentEnums,
      aliasEnums
    );
    this.validationParamDom.runValidation(getParamDepService);
  }
}
