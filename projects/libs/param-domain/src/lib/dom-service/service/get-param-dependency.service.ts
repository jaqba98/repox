import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";

@singleton()
/**
 * Get dependency between programs, commands and arguments.
 */
export class GetParamDependencyService {
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
              values: [],
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
                  values: [],
                  valueMode: "single",
                  required: true
                }
              }
            },
            [CommandEnum.project]: {
              command: CommandEnum.project,
              args: {
                [ArgumentEnum.name]: {
                  name: ArgumentEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                },
                [ArgumentEnum.type]: {
                  name: ArgumentEnum.type,
                  values: ["app", "lib", "tool"],
                  valueMode: "single",
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case ProgramEnum.build:
        return {
          program: ProgramEnum.default,
          commands: {
            [CommandEnum.default]: {
              command: CommandEnum.default,
              args: {}
            },
            [CommandEnum.project]: {
              command: CommandEnum.project,
              args: {
                [ArgumentEnum.name]: {
                  name: ArgumentEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                }
              }
            },
          },
          args: {}
        };
      default:
        throw new Error("No dependencies found for the program!");
    }
  }
}
