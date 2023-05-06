import { singleton } from "tsyringe";
import { Program } from "../../enum/program";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { Argument } from "../../enum/argument";
import { Command } from "../../enum/command";

@singleton()
/**
 * The service is responsible for give the dependence
 * between programs, commands, arguments and alases.
 */
export class GetParamDependenceService {
  getParamDependence(program: Program): ParamDependencyModel {
    switch (program) {
      case Program.default:
        return {
          program: Program.default,
          commands: {
            "": {
              command: Command.default,
              args: {}
            }
          },
          args: {
            version: {
              name: Argument.version,
              mustHasValue: false,
              mustHasManyValues: false,
              required: false
            }
          }
        };
      case Program.generate:
        return {
          program: Program.generate,
          commands: {
            "": {
              command: Command.default,
              args: {}
            },
            workspace: {
              command: Command.workspace,
              args: {
                name: {
                  name: Argument.name,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                }
              }
            },
            project: {
              command: Command.project,
              args: {
                name: {
                  name: Argument.name,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                },
                type: {
                  name: Argument.type,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                }
              }
            }
          },
          args: {}
        };
      case Program.unknown:
        return {
          program: Program.unknown,
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
