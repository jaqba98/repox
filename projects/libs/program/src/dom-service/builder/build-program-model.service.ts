import { singleton } from "tsyringe";
import {
  GenerateWorkspaceModel,
  ProgramDefaultModel
} from "../../model/program/program-property.model";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../../../parameter/src/model/param-domain/param-domain.model";
import { ArgumentEnum } from "../../../../parameter/src/enum/argument.enum";

/**
 * The service is responsible for build program model from
 * parameter domain model.
 */
@singleton()
export class BuildProgramModelService {
  buildProgramDefaultModel(
    paramDomain: ParamDomainModel
  ): ProgramDefaultModel {
    const version = this.getProgramParam(paramDomain, ArgumentEnum.version);
    return {
      version: Boolean(version)
    };
  }

  buildGenerateWorkspaceModel(
    paramDomain: ParamDomainModel
  ): GenerateWorkspaceModel {
    const name = this.getCommandParam(paramDomain, ArgumentEnum.name);
    return {
      name: name?.values[0] || ""
    };
  }

  private getProgramParam(
    paramDomain: ParamDomainModel,
    argument: ArgumentEnum
  ): ParamDomainArgumentModel | undefined {
    return paramDomain.program.args
      .find(arg => arg.name === argument);
  }

  private getCommandParam(
    paramDomain: ParamDomainModel,
    argument: ArgumentEnum
  ): ParamDomainArgumentModel | undefined {
    return paramDomain.command.args
      .find(arg => arg.name === argument);
  }
}
// todo: refactor