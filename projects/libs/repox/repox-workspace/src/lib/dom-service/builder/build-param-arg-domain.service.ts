import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";
import {
  DefaultDefaultProgramArgDomainModel,
  EmptyProgramArgDomainModel,
  ProgramArgDomainModel
} from "../../model/program-arg-domain.model";
import { ProgramEnum } from "../../enum/param-program/program.enum";
import {
  BuildLinkProjectCommandArgDomainModel,
  BuildProjectCommandArgDomainModel,
  CommandArgDomainModel,
  EmptyCommandArgDomainModel,
  GenerateProjectCommandArgModel,
  GenerateWorkspaceCommandArgDomainModel
} from "../../model/command-arg-domain.model";
import { CommandEnum } from "../../enum/param-program/command.enum";
import { ArgumentEnum } from "../../enum/param-program/argument.enum";


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
      case ProgramEnum.default:
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
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        return this.buildGenerateWorkspaceCommand(model);
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        return this.buildGenerateProjectCommand(model);
      case `${ProgramEnum.build}-${CommandEnum.project}`:
        return this.buildBuildProjectCommand(model);
      case `${ProgramEnum.link}-${CommandEnum.project}`:
        return this.buildLinkProjectCommand(model);
      case `${ProgramEnum.unlink}-${CommandEnum.project}`:
        return this.buildUnlinkProjectCommand(model);
      default:
        return <EmptyCommandArgDomainModel>{};
    }
  }

  private buildDefaultDefaultProgram(
    model: Array<any>
  ): DefaultDefaultProgramArgDomainModel {
    return {
      version: this.getValue(model, ArgumentEnum.version, false)
    }
  }

  private buildGenerateWorkspaceCommand(
    model: Array<any>
  ): GenerateWorkspaceCommandArgDomainModel {
    return {
      workspaceName: this.getValue(model, ArgumentEnum.name)
    };
  }

  private buildGenerateProjectCommand(
    model: Array<any>
  ): GenerateProjectCommandArgModel {
    return {
      name: this.getValue(model, ArgumentEnum.name),
      type: this.getValue(model, ArgumentEnum.type),
      path: this.getValue(model, ArgumentEnum.path),
      scheme: this.getValue(model, ArgumentEnum.scheme)
    };
  }

  private buildBuildProjectCommand(
    model: Array<any>
  ): BuildProjectCommandArgDomainModel {
    return {
      projectName: this.getValue(model, ArgumentEnum.name)
    };
  }

  private buildLinkProjectCommand(
    model: Array<any>
  ): BuildLinkProjectCommandArgDomainModel {
    return {
      projectName: this.getValue(model, ArgumentEnum.name)
    };
  }

  private buildUnlinkProjectCommand(
    model: Array<any>
  ): BuildLinkProjectCommandArgDomainModel {
    return {
      projectName: this.getValue(model, ArgumentEnum.name)
    };
  }

  private getValue<TValue>(
    model: Array<any>,
    argumentName: ArgumentEnum,
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
