import { singleton } from "tsyringe";
import {
  DefaultProgramArgModel,
  EmptyProgramArgModel,
  ProgramArgumentModel
} from "../../model/argument/program-argument.model";
import {
  CommandArgumentModel,
  EmptyCommandArgModel,
  GenerateProjectCommandArgModel,
  GenerateWorkspaceCommandArgModel
} from "../../model/argument/command-argument.model";
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
  ): ProgramArgumentModel {
    switch (programName) {
      case ProgramEnum.default:
        return this.buildDefaultProgram(model);
      case ProgramEnum.generate:
        return this.buildEmptyProgram();
      default:
        throw new Error("Not supported program name!");
    }
  }

  buildCommandModel(
    programName: ProgramEnum,
    commandName: CommandEnum,
    model: Array<ParamDomainArgModel>
  ): CommandArgumentModel {
    const fullName = `${programName}-${commandName}`;
    switch (fullName) {
      case `${ProgramEnum.default}-${CommandEnum.default}`:
        return this.buildEmptyCommand();
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        return this.buildGenerateWorkspaceCommand(model);
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        return this.buildGenerateProjectCommand(model);
      default:
        throw new Error("Not supported program name!");
    }
  }

  private buildEmptyProgram(): EmptyProgramArgModel {
    return {};
  }

  private buildDefaultProgram(
    model: Array<ParamDomainArgModel>
  ): DefaultProgramArgModel {
    return {
      version: this.getArgValue(model, ArgumentEnum.version, false)
    }
  }

  private buildEmptyCommand(): EmptyCommandArgModel {
    return {};
  }

  private buildGenerateWorkspaceCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateWorkspaceCommandArgModel {
    return {
      name: this.getArgValue(model, ArgumentEnum.name, "")
    };
  }

  private buildGenerateProjectCommand(
    model: Array<ParamDomainArgModel>
  ): GenerateProjectCommandArgModel {
    return {
      name: this.getArgValue(model, ArgumentEnum.name, ""),
      type: this.getArgValue(model, ArgumentEnum.type, "")
    };
  }

  private getArgValue<TValue>(
    model: Array<ParamDomainArgModel>,
    argumentName: ArgumentEnum,
    defVal: TValue
  ): TValue {
    const arg = model.find(arg => arg.name === argumentName);
    if (!arg) {
      return defVal;
    }
    switch (typeof defVal) {
      case "boolean":
        return <TValue>(arg.name === ArgumentEnum.version || defVal);
      case "string":
        return <TValue>(arg.values.at(0) || defVal);
      default:
        throw new Error("Not supported type of data!");
    }
  }
}
