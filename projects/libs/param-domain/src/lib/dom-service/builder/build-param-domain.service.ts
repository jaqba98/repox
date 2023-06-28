import { singleton } from "tsyringe";
import {
  GetParamDtoArgAppService,
  GetParamDtoIndexAppService,
  GetParamDtoNameAppService
} from "@lib/param-dto";
import { EMPTY_STRING } from "@lib/const";
import { KeyValueModel } from "@lib/model";
import {
  ParamDomainArgModel, ParamDomainModel
} from "../../model/param-domain/param-domain.model";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
  constructor(
    private readonly getParamDtoNameApp: GetParamDtoNameAppService,
    private readonly getParamDtoIndexApp: GetParamDtoIndexAppService,
    private readonly getParamDtoArgApp: GetParamDtoArgAppService,
    // private readonly buildParamArgDomain: BuildParamArgDomainService,
    // private readonly getParamDtoDataApp: GetParamDtoDataAppService,
    // private readonly paramDomainStore: ParamDomainStoreService,
  ) {
  }

  build<TProjectModel, TCommandModel>(
    programEnum: Array<KeyValueModel>,
    programAliasEnum: Array<KeyValueModel>,
    commandEnum: Array<KeyValueModel>,
    commandAliasEnum: Array<KeyValueModel>,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>
  ): void {
    const programBaseName = this.getParamDtoNameApp.getProgramName();
    const commandBaseName = this.getParamDtoNameApp.getCommandName();
    const programIndex = this.getParamDtoIndexApp.getProgramIndex(
      programBaseName
    );
    const commandIndex = this.getParamDtoIndexApp.getCommandIndex(
      commandBaseName
    );
    const programName = this.getProgramCommandName(
      programBaseName, programEnum, programAliasEnum
    );
    const commandName = this.getProgramCommandName(
      commandBaseName, commandEnum, commandAliasEnum
    );
    const programArgs = this.getParamDtoArgApp.getProgramArgs(
      programIndex, commandIndex
    );
    const commandArgs = this.getParamDtoArgApp.getCommandArgs(
      commandIndex
    );
    const programFullArgs = programArgs.map(arg => (
      <ParamDomainArgModel>{
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(
          arg.paramType, arg.paramName, argumentEnum, aliasEnum
        ),
        index: arg.paramIndex,
        values: arg.paramValues,
        hasValue: arg.paramHasValue,
        hasManyValues: arg.paramHasManyValues
      }));
    const commandFullArgs = commandArgs.map(arg => (
      <ParamDomainArgModel>{
        baseName: arg.paramBaseValue,
        name: this.getArgumentName(
          arg.paramType, arg.paramName, argumentEnum, aliasEnum
        ),
        index: arg.paramIndex,
        values: arg.paramValues,
        hasValue: arg.paramHasValue,
        hasManyValues: arg.paramHasManyValues
      }));
    const domain: ParamDomainModel<TProjectModel, TCommandModel> = {
      program: {
        baseName: programBaseName,
        name: programName,
        index: programIndex,
        args: programFullArgs,
        model: <any>{}
        // model: this.buildParamArgDomain.buildProgramModel(
        //   programName,
        //   programFullArgs
        // )
      },
      command: {
        baseName: commandBaseName,
        name: commandName,
        index: commandIndex,
        args: commandFullArgs,
        model: <any>{}
        // model: this.buildParamArgDomain.buildCommandModel(
        //   programName,
        //   commandName,
        //   commandFullArgs
        // )
      }
    };
    console.log(domain);
    // this.paramDomainStore.setParamDomain(paramDomain);
  }

  // todo: refactor this method
  private getProgramCommandName(
    baseName: string,
    fullEnums: Array<KeyValueModel>,
    aliasEnums: Array<KeyValueModel>
  ): string {
    if (!fullEnums.some(fullEnum => fullEnum.key === "default")) {
      throw new Error("Not defined default key in enum!");
    }
    if (!fullEnums.some(fullEnum => fullEnum.key === "unknown")) {
      throw new Error("Not defined unknown key in enum!");
    }
    if (baseName === EMPTY_STRING) {
      const defaultEnum = fullEnums.find(
        fullEnum => fullEnum.value === EMPTY_STRING
      );
      if (!defaultEnum) {
        throw new Error("Not defined default key in enum!");
      }
      return defaultEnum.key;
    }
    const aliasEnum = aliasEnums.find(aliasItem => {
      return aliasItem.value === baseName
    });
    if (aliasEnum) {
      const fullEnum = fullEnums.find(fullItem => {
        return fullItem.key === aliasEnum.key
      });
      if (!fullEnum) {
        throw new Error("For given enum alias not found full enum!");
      }
      return fullEnum.key;
    }
    const fullEnum = fullEnums.find(fullItem => {
      return fullItem.value === baseName
    });
    if (fullEnum) {
      return fullEnum.key;
    }
    return "unknown";
  }

  // todo: refactor this method
  private getArgumentName(
    paramType: string,
    paramName: string,
    argumentEnum: Array<KeyValueModel>,
    aliasEnum: Array<KeyValueModel>
  ): string {
    if (!argumentEnum.some(argument => argument.key === "unknown")) {
      throw new Error("Not defined unknown key in enum!");
    }
    if (paramType === "argument") {
      const argument = argumentEnum.find(argumentKey => {
        return argumentKey.value === paramName
      });
      return argument ? argument.key : "unknown";
    }
    if (paramType === "alias") {
      const alias = aliasEnum.find(aliasKey => {
        return aliasKey.value === paramName
      });
      return alias ? alias.key : "unknown";
    }
    return "unknown";
  }
}

// todo: refactor
