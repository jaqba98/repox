import { singleton } from "tsyringe";
import { BaseGetParamDepModel } from "@lib/model";
import { ProgramEnum } from "../../enum/param-program/program.enum";
import { CommandEnum } from "../../enum/param-program/command.enum";
import { ArgumentEnum } from "../../enum/param-program/argument.enum";
import {
  ProjectSchemeEnum
} from "../../enum/project/project-scheme.enum";

@singleton()
/**
 * Get dependency between programs, commands and arguments.
 */
export class GetParamDepService implements BaseGetParamDepModel {
  getDependency(program: string): any {
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
                },
                [ArgumentEnum.path]: {
                  name: ArgumentEnum.path,
                  values: [],
                  valueMode: "single",
                  required: false
                },
                [ArgumentEnum.scheme]: {
                  name: ArgumentEnum.scheme,
                  values: Object.values(ProjectSchemeEnum),
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
      case ProgramEnum.link:
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

// todo: refactor
