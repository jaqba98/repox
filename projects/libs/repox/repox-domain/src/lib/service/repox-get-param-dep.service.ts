import { singleton } from "tsyringe";
import { BaseGetParamDepModel } from "@lib/model";
import { RepoxProgramEnum } from "../enum/repox-program.enum";
import { RepoxCommandEnum } from "../enum/repox-command.enum";
import { RepoxArgumentEnum } from "../enum/repox-argument.enum";
import { ParamDomainDepModel } from "@lib/param-domain";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * Get dependency between programs, commands and arguments.
 */
export class RepoxGetParamDepService implements BaseGetParamDepModel {
  getDependency(program: string): ParamDomainDepModel {
    switch (program) {
      case RepoxProgramEnum.default:
        return {
          program: RepoxProgramEnum.default,
          commands: {
            [RepoxCommandEnum.default]: {
              command: RepoxCommandEnum.default,
              args: {}
            }
          },
          args: {
            [RepoxArgumentEnum.version]: {
              name: RepoxArgumentEnum.version,
              values: [],
              valueMode: "empty",
              required: false
            }
          }
        };
      case RepoxProgramEnum.generate:
        return {
          program: RepoxProgramEnum.generate,
          commands: {
            [RepoxCommandEnum.default]: {
              command: RepoxCommandEnum.default,
              args: {}
            },
            [RepoxCommandEnum.workspace]: {
              command: RepoxCommandEnum.workspace,
              args: {
                [RepoxArgumentEnum.name]: {
                  name: RepoxArgumentEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                }
              }
            },
            [RepoxCommandEnum.project]: {
              command: RepoxCommandEnum.project,
              args: {
                [RepoxArgumentEnum.name]: {
                  name: RepoxArgumentEnum.name,
                  values: [],
                  valueMode: "single",
                  required: true
                },
                [RepoxArgumentEnum.type]: {
                  name: RepoxArgumentEnum.type,
                  values: Object.values(ProjectTypeEnum),
                  valueMode: "single",
                  required: true
                },
                [RepoxArgumentEnum.scheme]: {
                  name: RepoxArgumentEnum.scheme,
                  values: Object.values(ProjectSchemeEnum),
                  valueMode: "single",
                  required: true
                },
                [RepoxArgumentEnum.path]: {
                  name: RepoxArgumentEnum.path,
                  values: [],
                  valueMode: "single",
                  required: false
                }
              }
            }
          },
          args: {}
        };
      case RepoxProgramEnum.build:
        return {
          program: RepoxProgramEnum.build,
          commands: {
            [RepoxCommandEnum.default]: {
              command: RepoxCommandEnum.default,
              args: {}
            },
            [RepoxCommandEnum.project]: {
              command: RepoxCommandEnum.project,
              args: {
                [RepoxArgumentEnum.name]: {
                  name: RepoxArgumentEnum.name,
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
        throw new Error(
          `No found dependency for ${program} program!`
        );
    }
  }
}
