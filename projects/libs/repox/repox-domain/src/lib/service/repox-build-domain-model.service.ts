import { singleton } from "tsyringe";
import {
  ParamDomainAppService,
  ParamDomainArgModel,
} from "@lib/param-domain";
import {
  DefaultDefaultRepoxProgramDomainModel,
  EmptyRepoxProgramDomainModel,
  RepoxProgramDomainModel
} from "../model/repox-program-domain.model";
import { RepoxProgramEnum } from "../enum/repox-program.enum";
import {
  BuildProjectRepoxCommandDomainModel,
  EmptyRepoxCommandDomainModel,
  GenerateProjectRepoxCommandDomainModel,
  GenerateWorkspaceRepoxCommandDomainModel,
  RepoxCommandDomainModel
} from "../model/repox-command-domain.model";
import { RepoxCommandEnum } from "../enum/repox-command.enum";
import { RepoxArgumentEnum } from "../enum/repox-argument.enum";
import { EMPTY_STRING } from "@lib/const";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for building correct and complete
 * domain model for all kinds of programs and commends.
 */
export class RepoxBuildDomainModelService {
  constructor(private readonly paramDomain: ParamDomainAppService) {
  }

  buildProgramDomainModel(): RepoxProgramDomainModel {
    const programName = this.paramDomain.getProgramName();
    if (programName === RepoxProgramEnum.default) {
      return this.buildDefaultDefaultProgram();
    }
    return <EmptyRepoxProgramDomainModel>{};
  }

  buildCommandDomainModel(): RepoxCommandDomainModel {
    const programName = this.paramDomain.getProgramName();
    const commandName = this.paramDomain.getCommandName();
    if (programName === RepoxProgramEnum.generate) {
      if (commandName === RepoxCommandEnum.workspace) {
        return this.buildGenerateWorkspaceCommand();
      }
      if (commandName === RepoxCommandEnum.project) {
        return this.buildGenerateProjectCommand();
      }
    }
    if (programName === RepoxProgramEnum.build) {
      if (commandName === RepoxCommandEnum.project) {
        return this.buildBuildProjectCommand();
      }
    }
    return <EmptyRepoxCommandDomainModel>{};
  }

  private buildDefaultDefaultProgram(): DefaultDefaultRepoxProgramDomainModel {
    return {
      showVersion: this.getProgramDomainModelValue<boolean>(
        RepoxArgumentEnum.version, false
      )
    }
  }

  private buildGenerateWorkspaceCommand(): GenerateWorkspaceRepoxCommandDomainModel {
    return {
      workspaceName: this.getCommandDomainModelValue<string>(
        RepoxArgumentEnum.name, EMPTY_STRING
      )
    };
  }

  private buildGenerateProjectCommand(): GenerateProjectRepoxCommandDomainModel {
    return {
      projectName: this.getCommandDomainModelValue<string>(
        RepoxArgumentEnum.name, EMPTY_STRING
      ),
      projectType: this.getCommandDomainModelValue<ProjectTypeEnum>(
        RepoxArgumentEnum.type, ProjectTypeEnum.app
      ),
      projectScheme: this.getCommandDomainModelValue<ProjectSchemeEnum>(
        RepoxArgumentEnum.scheme, ProjectSchemeEnum.typescript
      ),
      projectPath: this.getCommandDomainModelValue<string>(
        RepoxArgumentEnum.path, EMPTY_STRING
      )
    };
  }

  private buildBuildProjectCommand(): BuildProjectRepoxCommandDomainModel {
    return {
      projectName: this.getCommandDomainModelValue<string>(
        RepoxArgumentEnum.name, EMPTY_STRING
      ),
    };
  }

  private getProgramDomainModelValue<TValue>(
    argumentEnum: RepoxArgumentEnum,
    defaultValue: TValue
  ): TValue {
    const programArgument = this.paramDomain.getParamDomain()
      .program
      .args
      .find(arg => arg.name === argumentEnum);
    if (!programArgument) return defaultValue;
    return this.baseGetDomainModelValue(programArgument);
  }

  private getCommandDomainModelValue<TValue>(
    argumentEnum: RepoxArgumentEnum,
    defaultValue: TValue
  ): TValue {
    const commandArgument = this.paramDomain.getParamDomain()
      .command
      .args
      .find(arg => arg.name === argumentEnum);
    if (!commandArgument) return defaultValue;
    return this.baseGetDomainModelValue(commandArgument);
  }

  private baseGetDomainModelValue<TValue>(
    paramDomain: ParamDomainArgModel
  ): TValue {
    const { hasValue, hasManyValues } = paramDomain;
    if (!hasValue) {
      return <TValue>true;
    }
    if (hasValue && !hasManyValues) {
      return <TValue>paramDomain.values.at(0);
    }
    return <TValue>paramDomain.values;
  }
}
