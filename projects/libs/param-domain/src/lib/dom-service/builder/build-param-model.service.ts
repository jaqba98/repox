import { singleton } from "tsyringe";
import {
  DefaultProgramArgDomainModel,
  EmptyProgramArgDomainModel,
  ProgramArgDomainModel
} from "../../model/arg-domain/program-arg-domain.model";
import {
  BuildProjectCommandArgModel,
  CommandArgDomainModel,
  EmptyCommandArgModel,
  GenerateProjectCommandArgModel,
  GenerateWorkspaceCommandArgModel
} from "../../model/arg-domain/command-arg-domain.model";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import {
  ParamDomainArgModel
} from "../../model/param-domain/param-domain.model";
import { ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for build correct and complete
 * model for all kinds of programs and commends.
 */
export class BuildParamModelService {
  buildProgramModel(
    programName: ProgramEnum,
    model: Array<ParamDomainArgModel>
  ): ProgramArgDomainModel {
    switch (programName) {
      case ProgramEnum.default:
        return this.buildDefaultProgram(model);
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
        return this.buildGenerateProjectCommand(model);
      default:
        return <EmptyCommandArgModel>{};
    }
  }

  private buildDefaultProgram(
    model: Array<ParamDomainArgModel>
  ): DefaultProgramArgDomainModel {
    return {
      version: this.getVal(model, ArgumentEnum.version, false)
    }
  }

  private buildGenerateWorkspaceCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateWorkspaceCommandArgModel {
    return {
      name: this.getVal(model, ArgumentEnum.name, "")
    };
  }

  private buildGenerateProjectCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateProjectCommandArgModel {
    return {
      name: this.getVal(model, ArgumentEnum.name, ""),
      type: this.getVal(model, ArgumentEnum.type, "")
    };
  }

  private buildBuildProjectCommand(
    model: Array<ParamDomainArgModel>
  ): BuildProjectCommandArgModel {
    return {
      name: this.getVal(model, ArgumentEnum.name, "")
    };
  }

  private getVal<TValue>(
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
// todo: refactor