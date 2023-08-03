import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import {
  ValidationParamDomainService
} from "../dom-service/validation/validation-param-domain.service";
import {
  type BaseGetParamDepModel,
  type EnumModel,
  type KeyValueModel
} from "@lib/model";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor (
    private readonly buildParamDomain: BuildParamDomainService,
    private readonly validationParamDom: ValidationParamDomainService
  ) {
  }

  build (
    programEnumModel: EnumModel,
    programAliasEnumModel: EnumModel,
    commandEnumModel: EnumModel,
    commandAliasEnumModel: EnumModel,
    argumentEnumModel: EnumModel,
    aliasEnumModel: EnumModel,
    getParamDepService: BaseGetParamDepModel
  ): void {
    const programEnums = Object.entries(programEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
    const programAliasEnums = Object.entries(programAliasEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
    const commandEnums = Object.entries(commandEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
    const commandAliasEnums = Object.entries(commandAliasEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
    const argumentEnums = Object.entries(argumentEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
    const aliasEnums = Object.entries(aliasEnumModel)
      .map(([key, value]): KeyValueModel => ({ key, value }));
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
