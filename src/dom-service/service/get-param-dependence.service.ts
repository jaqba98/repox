import { singleton } from "tsyringe";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";

@singleton()
/**
 * The service is responsible for give the dependence
 * between programs, commands, arguments and alases.
 */
export class GetParamDependenceService {
  getParamDependence(
    program: ProgramEnum
  ): ParamDependencyModel {
    switch (program) {
      case ProgramEnum.default:
        return {
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            }
          },
          args: {
            [ArgumentEnum.version]: {
              argName: ArgumentEnum.version,
              required: false
            }
          }
        };
      case ProgramEnum.generate:
        return {
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            },
            [CommandEnum.workspace]: {
              commandName: CommandEnum.workspace,
              args: {
                [ArgumentEnum.name]: {
                  argName: ArgumentEnum.name,
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case ProgramEnum.unknown:
      default:
        throw new Error(
          "Failed to find param dependency for given param!"
        );
    }
  }
}
