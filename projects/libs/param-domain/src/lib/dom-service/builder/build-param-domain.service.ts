import { singleton } from "tsyringe";
import {
  GetParamDtoArgAppService,
  GetParamDtoIndexAppService,
  GetParamDtoNameAppService
} from "@lib/param-dto";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { KeyValueModel } from "@lib/model";
import { BuildParamNameService } from "./build-param-name.service";
import {
  ParamDomainArgModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly getParamDtoName: GetParamDtoNameAppService,
    private readonly getParamDtoIndex: GetParamDtoIndexAppService,
    private readonly buildParamName: BuildParamNameService,
    private readonly getParamDtoArg: GetParamDtoArgAppService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  build(
    programEnums: Array<KeyValueModel>,
    programAliasEnums: Array<KeyValueModel>,
    commandEnums: Array<KeyValueModel>,
    commandAliasEnums: Array<KeyValueModel>,
    argumentEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): void {
    const programBaseName = this.getParamDtoName.getProgramName();
    const commandBaseName = this.getParamDtoName.getCommandName();
    const programIndex = this.getParamDtoIndex.getProgramIndex(
      programBaseName
    );
    const commandIndex = this.getParamDtoIndex.getCommandIndex(
      commandBaseName
    );
    const programName = this.buildParamName.buildProgramName(
      programBaseName, programEnums, programAliasEnums
    );
    const commandName = this.buildParamName.buildCommandName(
      commandBaseName, commandEnums, commandAliasEnums
    );
    const programArgs = this.getParamDtoArg.getProgramArgs(
      programIndex, commandIndex
    );
    const commandArgs = this.getParamDtoArg.getCommandArgs(
      commandIndex
    );
    const programDomainArgs = programArgs
      .map<ParamDomainArgModel>(programArg => ({
        baseName: programArg.paramBaseValue,
        name: this.buildParamName.buildArgumentName(
          programArg.paramType, programArg.paramName,
          argumentEnums, aliasEnums
        ),
        index: programArg.paramIndex,
        values: programArg.paramValues,
        hasValue: programArg.paramHasValue,
        hasManyValues: programArg.paramHasManyValues
      }));
    const commandDomainArgs = commandArgs
      .map<ParamDomainArgModel>(programArg => ({
        baseName: programArg.paramBaseValue,
        name: this.buildParamName.buildArgumentName(
          programArg.paramType, programArg.paramName,
          argumentEnums, aliasEnums
        ),
        index: programArg.paramIndex,
        values: programArg.paramValues,
        hasValue: programArg.paramHasValue,
        hasManyValues: programArg.paramHasManyValues
      }));
    const paramDomain: ParamDomainModel = {
      program: {
        baseName: programBaseName,
        name: programName,
        index: programIndex,
        args: programDomainArgs
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: commandDomainArgs
      }
    };
    this.paramDomainStore.setParamDomain(paramDomain);
  }
}
