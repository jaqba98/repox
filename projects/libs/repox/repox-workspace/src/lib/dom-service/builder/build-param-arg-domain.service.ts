import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";
import {
  DefaultDefaultProgramArgDomainModel,
  EmptyProgramArgDomainModel,
  ProgramArgDomainModel
} from "../../model/program-arg-domain.model";
import {
  BuildLinkProjectCommandArgDomainModel,
  BuildProjectCommandArgDomainModel,
  CommandArgDomainModel,
  EmptyCommandArgDomainModel,
  GenerateProjectCommandArgModel,
  GenerateWorkspaceCommandArgDomainModel
} from "../../model/command-arg-domain.model";
import {
  ArgumentRepoxEnum,
  CommandRepoxEnum,
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
  ): ProgramArgDomainModel {
    switch (programName) {
      case ProgramRepoxEnum.default:
        return this.buildDefaultDefaultProgram(model);
      default:
        return <EmptyProgramArgDomainModel>{};
    }
  }

  buildCommandModel(
    programName: string,
    commandName: string,
    model: Array<any>
  ): CommandArgDomainModel {
    const fullName = `${programName}-${commandName}`;
    switch (fullName) {
      case `${ProgramRepoxEnum.generate}-${CommandRepoxEnum.workspace}`:
        return this.buildGenerateWorkspaceCommand(model);
      case `${ProgramRepoxEnum.generate}-${CommandRepoxEnum.project}`:
        return this.buildGenerateProjectCommand(model);
      case `${ProgramRepoxEnum.build}-${CommandRepoxEnum.project}`:
        return this.buildBuildProjectCommand(model);
      default:
        return <EmptyCommandArgDomainModel>{};
    }
  }

  private buildDefaultDefaultProgram(
    model: Array<any>
  ): DefaultDefaultProgramArgDomainModel {
    return {
      version: this.getValue(model, ArgumentRepoxEnum.version, false)
    }
  }

  private buildGenerateWorkspaceCommand(
    model: Array<any>
  ): GenerateWorkspaceCommandArgDomainModel {
    return {
      workspaceName: this.getValue(model, ArgumentRepoxEnum.name)
    };
  }

  private buildGenerateProjectCommand(
    model: Array<any>
  ): GenerateProjectCommandArgModel {
    return {
      name: this.getValue(model, ArgumentRepoxEnum.name),
      type: this.getValue(model, ArgumentRepoxEnum.type),
      path: this.getValue(model, ArgumentRepoxEnum.path),
      scheme: this.getValue(model, ArgumentRepoxEnum.scheme)
    };
  }

  private buildBuildProjectCommand(
    model: Array<any>
  ): BuildProjectCommandArgDomainModel {
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
