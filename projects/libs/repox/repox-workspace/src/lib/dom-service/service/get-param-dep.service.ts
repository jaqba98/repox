import { singleton } from "tsyringe";
import { BaseGetParamDepModel } from "@lib/model";
import {
  ProjectSchemeEnum
} from "../../enum/project/project-scheme.enum";
import {
  ArgumentRepoxEnum,
  CommandRepoxEnum,
  ProgramRepoxEnum
} from "@tool/repox-domain";

@singleton()
/**
 * Get dependency between programs, commands and arguments.
 */
export class GetParamDepService implements BaseGetParamDepModel {
  getDependency(program: string): any {
    switch (program) {
      case ProgramRepoxEnum.default:
        return {
          program: ProgramRepoxEnum.default,
          commands: {
            [CommandRepoxEnum.default]: {
              command: CommandRepoxEnum.default,
              args: {}
            }
          },
          args: {
            [ArgumentRepoxEnum.version]: {
              name: ArgumentRepoxEnum.version,
              values: [],
              valueMode: "empty",
              required: false
            }
          }
        };
      case ProgramRepoxEnum.generate:
        return {
          program: ProgramRepoxEnum.generate,
          commands: {
            [CommandRepoxEnum.default]: {
              command: CommandRepoxEnum.default,
              args: {}
            },
            [CommandRepoxEnum.workspace]: {
              command: CommandRepoxEnum.workspace,
              args: {
                [ArgumentRepoxEnum.name]: {
                  name: ArgumentRepoxEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                }
              }
            },
            [CommandRepoxEnum.project]: {
              command: CommandRepoxEnum.project,
              args: {
                [ArgumentRepoxEnum.name]: {
                  name: ArgumentRepoxEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                },
                [ArgumentRepoxEnum.type]: {
                  name: ArgumentRepoxEnum.type,
                  values: ["app", "lib", "tool"],
                  valueMode: "single",
                  required: true
                },
                [ArgumentRepoxEnum.path]: {
                  name: ArgumentRepoxEnum.path,
                  values: [],
                  valueMode: "single",
                  required: false
                },
                [ArgumentRepoxEnum.scheme]: {
                  name: ArgumentRepoxEnum.scheme,
                  values: Object.values(ProjectSchemeEnum),
                  valueMode: "single",
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case ProgramRepoxEnum.build:
        return {
          program: ProgramRepoxEnum.default,
          commands: {
            [CommandRepoxEnum.default]: {
              command: CommandRepoxEnum.default,
              args: {}
            },
            [CommandRepoxEnum.project]: {
              command: CommandRepoxEnum.project,
              args: {
                [ArgumentRepoxEnum.name]: {
                  name: ArgumentRepoxEnum.name,
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
