import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto.model";
import {
  ParamDomainModel
} from "../../model/param-domain.model";
import { ParamTypeEnum } from "../../infra/enum/param-type.enum";

@singleton()
/**
 * The service is responsible for build the parameter domain model.
 */
export class BuildParamDomainService {
  build(paramDto: ParamDtoModel): ParamDomainModel {
    const program = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
    const command = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.command);
    if (program === undefined || command === undefined) {
      throw new Error('Program and command must not be undefined!');
    }
    const programIndex = program.index;
    const commandIndex = command.index;
    const programArgs = paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param =>
        param.index > programIndex && param.index < commandIndex
      )
      .map(param => this.buildArg(param));
    const commandArgs = paramDto.params
      .filter(param => this.isArgument(param))
      .filter(param => param.index > commandIndex)
      .map(param => this.buildArg(param));
    return {
      program: { name: program.paramName, args: programArgs },
      command: { name: command.paramName, args: commandArgs }
    };
  }

  private isArgument(param: ParamDtoEntityModel): boolean {
    return param.paramType === ParamTypeEnum.argument ||
      param.paramType === ParamTypeEnum.alias;
  }

  private buildArg(param: ParamDtoEntityModel): {
    name: string,
    value: Array<string>,
    isAlias: boolean
  } {
    return {
      name: param.paramName,
      value: param.paramValues,
      isAlias: param.paramType === ParamTypeEnum.alias
    }
  }
}
