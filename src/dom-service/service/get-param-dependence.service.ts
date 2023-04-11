import { CommandEnum } from "../../enum/command.enum";
import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * The service is responsible for give the dependence
 * between programs, commands, arguments and alases.
 */
export class GetParamDependenceService {
  getParamDependence(program: ProgramEnum): ParamDependencyModel {
    switch (program) {
      case ProgramEnum.default:
        return {
          programName: ProgramEnum.default,
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            }
          },
          args: {}
        };
      case ProgramEnum.generate:
        return {
          programName: ProgramEnum.generate,
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
            },
            [CommandEnum.project]: {
              commandName: CommandEnum.project,
              args: {
                [ArgumentEnum.name]: {
                  argName: ArgumentEnum.name,
                  required: true
                },
                [ArgumentEnum.type]: {
                  argName: ArgumentEnum.type,
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case ProgramEnum.unknown:
        return {
          programName: ProgramEnum.unknown,
          commands: {},
          args: {}
        };
      default:
        throw new Error(
          "Parameter dependency not found for the given program!"
        );
    }
  }
}
