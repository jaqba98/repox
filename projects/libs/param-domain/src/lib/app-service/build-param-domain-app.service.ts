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

  build<TProjectModel, TCommandModel>(
    programEnum: Array<KeyValueModel>,
    programAliasEnum: Array<KeyValueModel>,
    commandEnum: Array<KeyValueModel>,
    commandAliasEnum: Array<KeyValueModel>,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>,
    buildParamArgDomain: any
  ): void {
    this.buildParamDomain.build<TProjectModel, TCommandModel>(
      programEnum,
      programAliasEnum,
      commandEnum,
      commandAliasEnum,
      argumentEnum,
      aliasEnum,
      buildParamArgDomain
    );
    // this.valParamDomain.runValidation();
  }
}
// todo: refactor
