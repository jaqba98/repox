import { singleton } from "tsyringe";
import {
  DefaultDefaultRepoxProgramModel,
  EmptyRepoxProgramModel,
  RepoxArgumentEnum
} from "@lib/repox-domain";
import { ParamDomainAppService } from "@lib/param-domain";

@singleton()
/**
 * The service is responsible for building correct and complete
 * model for all kinds of programs and commends.
 */
export class RepoxBuildParamModelService {
  constructor(private readonly paramDo: ParamDomainAppService) {
  }

  buildEmptyProgramParamModel(): EmptyRepoxProgramModel {
    return {};
  }

  buildDefaultProgramParamModel(): DefaultDefaultRepoxProgramModel {
    // todo: I am here
    return {
      showVersion: this.getBooleanValue(RepoxArgumentEnum.version)
    }
  }

  private getBooleanValue(argument: RepoxArgumentEnum): boolean {
    return this.paramDo.getParamDomain().program.args
      .some(param => param.name === argument);
  }

  // buildProgramDomainModel(): TRepoxProgramModel {
  //   const programName = this.paramDomain.getProgramName();
  //   if (programName === RepoxProgramEnum.default) {
  //     return this.buildDefaultDefaultProgram();
  //   }
  //   return <EmptyRepoxProgramModel>{};
  // }

  // buildCommandDomainModel(): TRepoxCommandModel {
  //   const programName = this.paramDomain.getProgramName();
  //   const commandName = this.paramDomain.getCommandName();
  //   if (programName === RepoxProgramEnum.generate) {
  //     if (commandName === RepoxCommandEnum.workspace) {
  //       return this.buildGenerateWorkspaceCommand();
  //     }
  //     if (commandName === RepoxCommandEnum.project) {
  //       return this.buildGenerateProjectCommand();
  //     }
  //   }
  //   if (programName === RepoxProgramEnum.build) {
  //     if (commandName === RepoxCommandEnum.project) {
  //       return this.buildBuildProjectCommand();
  //     }
  //   }
  //   return <EmptyRepoxCommandModel>{};
  // }

  // private buildDefaultDefaultProgram(): DefaultDefaultRepoxProgramModel {
  //   return {
  //     showVersion: this.getProgramDomainModelValue<boolean>(
  //       RepoxArgumentEnum.version, false
  //     )
  //   }
  // }

  // private buildGenerateWorkspaceCommand(): GenerateWorkspaceRepoxCommandModel {
  //   return {
  //     workspaceName: this.getCommandDomainModelValue<string>(
  //       RepoxArgumentEnum.name, EMPTY_STRING
  //     )
  //   };
  // }

  // private buildGenerateProjectCommand(): GenerateProjectRepoxCommandModel {
  //   return {
  //     projectName: this.getCommandDomainModelValue<string>(
  //       RepoxArgumentEnum.name, EMPTY_STRING
  //     ),
  //     projectType: this.getCommandDomainModelValue<ProjectTypeEnum>(
  //       RepoxArgumentEnum.type, ProjectTypeEnum.app
  //     ),
  //     projectScheme: this.getCommandDomainModelValue<ProjectSchemeEnum>(
  //       RepoxArgumentEnum.scheme, ProjectSchemeEnum.typescript
  //     ),
  //     projectPath: this.getCommandDomainModelValue<string>(
  //       RepoxArgumentEnum.path, EMPTY_STRING
  //     )
  //   };
  // }

  // private buildBuildProjectCommand(): BuildProjectRepoxCommandModel {
  //   return {
  //     projectName: this.getCommandDomainModelValue<string>(
  //       RepoxArgumentEnum.name, EMPTY_STRING
  //     ),
  //   };
  // }

  // private getProgramDomainModelValue<TValue>(
  //   argumentEnum: RepoxArgumentEnum,
  //   defaultValue: TValue
  // ): TValue {
  //   const programArgument = this.paramDomain.getParamDomain()
  //     .program
  //     .args
  //     .find(arg => arg.name === argumentEnum);
  //   if (!programArgument) return defaultValue;
  //   return this.baseGetDomainModelValue(programArgument);
  // }

  // private getCommandDomainModelValue<TValue>(
  //   argumentEnum: RepoxArgumentEnum,
  //   defaultValue: TValue
  // ): TValue {
  //   const commandArgument = this.paramDomain.getParamDomain()
  //     .command
  //     .args
  //     .find(arg => arg.name === argumentEnum);
  //   if (!commandArgument) return defaultValue;
  //   return this.baseGetDomainModelValue(commandArgument);
  // }

  // private baseGetDomainModelValue<TValue>(
  //   paramDomain: ParamDomainArgModel
  // ): TValue {
  //   const { hasValue, hasManyValues } = paramDomain;
  //   if (!hasValue) {
  //     return <TValue>true;
  //   }
  //   if (hasValue && !hasManyValues) {
  //     return <TValue>paramDomain.values.at(0);
  //   }
  //   return <TValue>paramDomain.values;
  // }
}

// todo: refactor
