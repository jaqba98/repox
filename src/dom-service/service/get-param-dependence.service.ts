import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../enum/argument.enum";
import { CommandEnum } from "../../enum/command.enum";

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
          program: ProgramEnum.default,
          commands: {
            default: {
              command: CommandEnum.default,
              args: {}
            }
          },
          args: {
            version: {
              name: ArgumentEnum.version,
              mustHasValue: false,
              mustHasManyValues: false,
              required: false
            }
          }
        };
      case ProgramEnum.generate:
        return {
          program: ProgramEnum.generate,
          commands: {
            workspace: {
              command: CommandEnum.workspace,
              args: {
                name: {
                  name: ArgumentEnum.name,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                }
              }
            },
            project: {
              command: CommandEnum.project,
              args: {
                name: {
                  name: ArgumentEnum.name,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                },
                type: {
                  name: ArgumentEnum.type,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case ProgramEnum.unknown:
        return {
          program: ProgramEnum.unknown,
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
