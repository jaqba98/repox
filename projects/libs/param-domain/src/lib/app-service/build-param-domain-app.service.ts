import { singleton } from "tsyringe";
import {
  BuildParamDomainService
} from "../dom-service/builder/build-param-domain.service";
import { KeyValueModel } from "@lib/model";

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainService,
    // private readonly valParamDomain: ValidationParamDomainService
  ) {
  }

  build(
    programEnum: Array<KeyValueModel>,
    programAliasEnum: Array<KeyValueModel>,
    commandEnum: Array<KeyValueModel>,
    commandAliasEnum: Array<KeyValueModel>,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>
  ): void {
    this.buildParamDomain.build(
      programEnum, programAliasEnum,
      commandEnum, commandAliasEnum,
      argumentEnum, aliasEnum
    );
    // this.valParamDomain.runValidation();
  }
}
