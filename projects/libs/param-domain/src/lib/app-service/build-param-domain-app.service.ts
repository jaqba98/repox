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
    private readonly buildParamDomain: BuildParamDomainService
  ) {
  }

  build<TProgramArgDm, TCommandArgDm>(
    programEnums: Array<KeyValueModel>,
    programAliasEnums: Array<KeyValueModel>,
    commandEnums: Array<KeyValueModel>,
    commandAliasEnums: Array<KeyValueModel>,
    argumentEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): void {
    this.buildParamDomain.build<TProgramArgDm, TCommandArgDm>(
      programEnums,
      programAliasEnums,
      commandEnums,
      commandAliasEnums,
      argumentEnums,
      aliasEnums
    );
    // todo: add validation of param domain
  }
}
