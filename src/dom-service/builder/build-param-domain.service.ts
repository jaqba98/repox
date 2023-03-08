// todo: refactor
import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infrastructure/model/param-dto/param-dto.model";
import {
  ParamDomainModel
} from "../../model/param-domain.model";
import { ParamType } from "../../infrastructure/enum/param-dto-type";

@singleton()
/**
 * The service is responsible for build the parameter domain model.
 */
export class BuildParamDomainService {
  build(paramDto: ParamDtoModel): ParamDomainModel {
    const program = paramDto.params
      .find(param => param.paramType === ParamType.program);
    const command = paramDto.params
      .find(param => param.paramType === ParamType.command);
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
      program: {
        name: program.paramName,
        index: program.index,
        args: programArgs
      },
      command: {
        name: command.paramName,
        index: command.index,
        args: commandArgs
      }
    };
  }

  private isArgument(param: ParamDtoEntityModel): boolean {
    return param.paramType === ParamType.argument ||
      param.paramType === ParamType.alias;
  }

  private buildArg(param: ParamDtoEntityModel): {
    name: string,
    value: Array<string>,
    index: number,
    isAlias: boolean
  } {
    return {
      name: param.paramName,
      value: param.paramValues,
      index: param.index,
      isAlias: param.paramType === ParamType.alias
    }
  }
}
