import { singleton } from "tsyringe";
import { ProgramEnum } from "../../parameter/src/enum/program.enum";
import {
  ParamDependencyModel
} from "../../parameter/src/model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../parameter/src/enum/argument.enum";
import { CommandEnum } from "../../parameter/src/enum/command.enum";

/**
 * Give dependency between programs, commands arguments and aliases.
 */
@singleton()
export class GetParamDependency {
  getDependency(program: ProgramEnum): ParamDependencyModel {
    switch (program) {
      case ProgramEnum.default:
        return {
          program: ProgramEnum.default,
          commands: {
            [CommandEnum.default]: {
              command: CommandEnum.default,
              args: {}
            }
          },
          args: {
            [ArgumentEnum.version]: {
              name: ArgumentEnum.version,
              valueMode: "empty",
              required: false
            }
          }
        };
      case ProgramEnum.generate:
        return {
          program: ProgramEnum.generate,
          commands: {
            [CommandEnum.default]: {
              command: CommandEnum.default,
              args: {}
            },
            [CommandEnum.workspace]: {
              command: CommandEnum.workspace,
              args: {
                [ArgumentEnum.name]: {
                  name: ArgumentEnum.name,
                  valueMode: "single",
                  required: true
                },
                [ArgumentEnum.config]: {
                  name: ArgumentEnum.config,
                  valueMode: "single",
                  required: false
                }
              }
            },
            [CommandEnum.project]: {
              command: CommandEnum.project,
              args: {
                [ArgumentEnum.name]: {
                  name: ArgumentEnum.name,
                  valueMode: "single",
                  required: true
                },
                [ArgumentEnum.type]: {
                  name: ArgumentEnum.type,
                  valueMode: "single",
                  required: true
                }
              }
            }
          },
          args: {}
        };
      default:
        throw new Error(
          `No dependencies found for the ${program} program`
        );
    }
  }
}
