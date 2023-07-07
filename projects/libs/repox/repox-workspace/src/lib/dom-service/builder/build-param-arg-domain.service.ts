import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";
import {
  ArgumentRepoxEnum,
  BuildProjectCommandArgRepoxModel,
  CommandArgRepoxModel,
  CommandRepoxEnum,
  DefaultDefaultProgramArgRepoxModel,
  EmptyCommandArgRepoxModel,
  EmptyProgramArgRepoxModel,
  GenerateProjectCommandArgRepoxModel,
  GenerateWorkspaceCommandArgRepoxModel,
  ProgramArgRepoxModel,
  ProgramRepoxEnum
} from "@tool/repox-domain";


@singleton()
/**
 * The service is responsible for build correct and complete
 * model for all kinds of programs and commends.
 */
export class BuildParamArgDomainService {
  buildProgramModel(
    programName: string,
    model: Array<any>
  ): ProgramArgRepoxModel {
    switch (programName) {
      case ProgramRepoxEnum.default:
        return this.buildDefaultDefaultProgram(model);
      default:
        return <EmptyProgramArgRepoxModel>{};
    }
  }

  buildCommandModel(
    programName: string,
    commandName: string,
    model: Array<any>
  ): CommandArgRepoxModel {
    const fullName = `${programName}-${commandName}`;
    switch (fullName) {
      case `${ProgramRepoxEnum.generate}-${CommandRepoxEnum.workspace}`:
        return this.buildGenerateWorkspaceCommand(model);
      case `${ProgramRepoxEnum.generate}-${CommandRepoxEnum.project}`:
        return this.buildGenerateProjectCommand(model);
      case `${ProgramRepoxEnum.build}-${CommandRepoxEnum.project}`:
        return this.buildBuildProjectCommand(model);
      default:
        return <EmptyCommandArgRepoxModel>{};
    }
  }

  private buildDefaultDefaultProgram(
    model: Array<any>
  ): DefaultDefaultProgramArgRepoxModel {
    return {
      version: this.getValue(model, ArgumentRepoxEnum.version, false)
    }
  }

  private buildGenerateWorkspaceCommand(
    model: Array<any>
  ): GenerateWorkspaceCommandArgRepoxModel {
    return {
      workspaceName: this.getValue(model, ArgumentRepoxEnum.name)
    };
  }

  private buildGenerateProjectCommand(
    model: Array<any>
  ): GenerateProjectCommandArgRepoxModel {
    return {
      name: this.getValue(model, ArgumentRepoxEnum.name),
      type: this.getValue(model, ArgumentRepoxEnum.type),
      path: this.getValue(model, ArgumentRepoxEnum.path),
      scheme: this.getValue(model, ArgumentRepoxEnum.scheme)
    };
  }

  private buildBuildProjectCommand(
    model: Array<any>
  ): BuildProjectCommandArgRepoxModel {
    return {
      projectName: this.getValue(model, ArgumentRepoxEnum.name)
    };
  }

  private getValue<TValue>(
    model: Array<any>,
    argumentName: ArgumentRepoxEnum,
    defaultValue: TValue = <TValue>EMPTY_STRING
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
