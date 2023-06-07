import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDomainArgModel
} from "../../model/param-domain/param-domain.model";
import {
  DefaultDefaultProgramArgDomainModel,
  EmptyProgramArgDomainModel,
  ProgramArgDomainModel
} from "../../model/arg-domain/program-arg-domain.model";
import { CommandEnum } from "../../enum/command.enum";
import {
  BuildProjectCommandArgDomainModel,
  CommandArgDomainModel,
  EmptyCommandArgDomainModel,
  GenerateProjectCommandArgDomainModel,
  GenerateWorkspaceCommandArgDomainModel
} from "../../model/arg-domain/command-arg-domain.model";
import { ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for build correct and complete
 * model for all kinds of programs and commends.
 */
export class BuildParamArgDomainService {
  buildProgramModel(
    programName: ProgramEnum,
    model: Array<ParamDomainArgModel>
  ): ProgramArgDomainModel {
    switch (programName) {
      case ProgramEnum.default:
        return this.buildDefaultDefaultProgram(model);
      default:
        return <EmptyProgramArgDomainModel>{};
    }
  }

  buildCommandModel(
    programName: ProgramEnum,
    commandName: CommandEnum,
    model: Array<ParamDomainArgModel>
  ): CommandArgDomainModel {
    const fullName = `${programName}-${commandName}`;
    switch (fullName) {
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        return this.buildGenerateWorkspaceCommand(model);
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        return this.buildGenerateProjectCommand(model);
      case `${ProgramEnum.build}-${CommandEnum.project}`:
        return this.buildBuildProjectCommand(model);
      default:
        return <EmptyCommandArgDomainModel>{};
    }
  }

  private buildDefaultDefaultProgram(
    model: Array<ParamDomainArgModel>
  ): DefaultDefaultProgramArgDomainModel {
    return {
      version: this.getValue(model, ArgumentEnum.version, false)
    }
  }

  private buildGenerateWorkspaceCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateWorkspaceCommandArgDomainModel {
    return {
      workspaceName: this.getValue(model, ArgumentEnum.name, "")
    };
  }

  private buildGenerateProjectCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateProjectCommandArgDomainModel {
    return {
      projectName: this.getValue(model, ArgumentEnum.name, ""),
      projectType: this.getValue(model, ArgumentEnum.type, "")
    };
  }

  private buildBuildProjectCommand(
    model: Array<ParamDomainArgModel>
  ): BuildProjectCommandArgDomainModel {
    return {
      projectName: this.getValue(model, ArgumentEnum.name, "")
    };
  }

  private getValue<TValue>(
    model: Array<ParamDomainArgModel>,
    argumentName: ArgumentEnum,
    defaultValue: TValue
  ): TValue {
    const arg = model.find(arg => arg.name === argumentName);
    if (!arg) {
      return defaultValue;
    }
    switch (typeof defaultValue) {
      case "boolean":
        return <TValue>(arg || defaultValue);
      case "string":
        return <TValue>(arg.values.at(0) || defaultValue);
      default:
        throw new Error("Not supported type of data!");
    }
  }
}
