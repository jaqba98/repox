import { singleton } from "tsyringe";
import {
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
    const version = this.getParam(paramDomain, Argument.version);
    return {
      version: Boolean(version)
    };
  }

  private getParam(
    paramDomain: ParamDomainModel,
    argument: Argument
  ): ParamDomainArgumentModel | undefined {
    return paramDomain.program.args
      .find(arg => arg.name === argument);
  }
}
