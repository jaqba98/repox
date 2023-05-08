import { singleton } from "tsyringe";
import {
  GenerateWorkspaceModel,
  ProgramDefaultModel
} from "../../model/command/program-default-model";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import { Argument } from "../../enum/argument";

/**
 * The service is responsible for build command model from
 * parameter domain model.
 */
@singleton()
export class BuildCommandModel {
  buildProgramDefaultModel(
    paramDomain: ParamDomainModel
  ): ProgramDefaultModel {
    const version = this.getProgramParam(paramDomain, Argument.version);
    return {
      version: Boolean(version)
    };
  }

  buildGenerateWorkspaceModel(
    paramDomain: ParamDomainModel
  ): GenerateWorkspaceModel {
    console.log(paramDomain);
    const name = this.getCommandParam(paramDomain, Argument.name);
    const config = this.getCommandParam(paramDomain, Argument.config);
    return {
      name: name?.values[0] || "",
      config: config?.values[0] || ""
    };
  }

  private getProgramParam(
    paramDomain: ParamDomainModel,
    argument: Argument
  ): ParamDomainArgumentModel | undefined {
    return paramDomain.program.args
      .find(arg => arg.name === argument);
  }

  private getCommandParam(
    paramDomain: ParamDomainModel,
    argument: Argument
  ): ParamDomainArgumentModel | undefined {
    return paramDomain.command.args
      .find(arg => arg.name === argument);
  }
}
