import { singleton } from "tsyringe";
import {
  ArgumentEnum,
  ParamDomainArgumentModel,
  ParamDomainModel
} from "@lib/parameter";
import {
  GenerateProjectModel,
  GenerateWorkspaceModel,
  ProgramDefaultModel
} from "../model/program/program-argument.model";

@singleton()
/**
 * The service is responsible for build program model from
 * parameter domain model.
 */
export class BuildProgramModelService {
  buildProgramDefaultModel(
    paramDomain: ParamDomainModel
  ): ProgramDefaultModel {
    const version = this.getParam(
      paramDomain, ArgumentEnum.version, "program", [], false
    );
    return {
      version: Boolean(version)
    };
  }

  buildGenerateWorkspaceModel(
    paramDomain: ParamDomainModel
  ): GenerateWorkspaceModel {
    const name = this.getParam(
      paramDomain, ArgumentEnum.name, "command", [], false
    );
    return {
      name: this.getSingleValue(name)
    };
  }

  buildGenerateProjectModel(
    paramDomain: ParamDomainModel
  ): GenerateProjectModel {
    return {};
  }

  private getParam(
    param: ParamDomainModel,
    argument: ArgumentEnum,
    entity: "program" | "command",
    defaults: Array<string>,
    hasDefault: boolean
  ): ParamDomainArgumentModel | undefined {
    const arg = param[entity].args.find(arg => arg.name === argument);
    if (arg) return arg;
    if (!hasDefault) return undefined;
    const values = defaults.length === 0 ? [] : [...defaults];
    return {
      baseName: `--${argument}`,
      index: 0,
      hasValue: values.length > 0,
      name: argument,
      values,
      hasManyValues: values.length > 1
    };
  }

  private getSingleValue(
    paramDomain: ParamDomainArgumentModel | undefined
  ): string {
    if (!paramDomain) {
      return "";
    }
    if (!paramDomain.hasValue) {
      throw new Error("The given argument has no value!");
    }
    if (paramDomain.hasManyValues) {
      throw new Error("The given argument has more than one value!");
    }
    return paramDomain.values[0];
  }
}
// todo: refactor