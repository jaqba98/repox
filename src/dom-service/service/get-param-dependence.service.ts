import { singleton } from "tsyringe";
import { Program } from "../../enum/program";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";
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
            [Command.default]: {
              command: Command.default,
              args: {}
            }
          },
          args: {
            [Argument.version]: {
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
            [Command.default]: {
              command: Command.default,
              args: {}
            },
            [Command.workspace]: {
              command: Command.workspace,
              args: {
                [Argument.name]: {
                  name: Argument.name,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: true
                },
                [Argument.config]: {
                  name: Argument.config,
                  mustHasValue: true,
                  mustHasManyValues: false,
                  required: false
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
// todo: refactor this