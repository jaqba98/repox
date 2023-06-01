import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../enum/argument.enum";
import { CommandEnum } from "../../enum/command.enum";

@singleton()
/**
 * Get dependency between programs, commands arguments and aliases.
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
              value: [],
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
                  value: [],
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
                  value: [],
                  valueMode: "single",
                  required: true
                },
                [ArgumentEnum.type]: {
                  name: ArgumentEnum.type,
                  value: ["app", "lib", "tool"],
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
                  value: [],
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
// todo: refactor