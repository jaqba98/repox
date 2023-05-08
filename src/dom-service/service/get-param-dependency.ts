import { singleton } from "tsyringe";
import { Program } from "../../enum/program";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";
import { Argument } from "../../enum/argument";
import { Command } from "../../enum/command";

/**
 * Give dependency between programs, commands arguments and aliases.
 */
@singleton()
export class GetParamDependency {
  getDependency(program: Program): ParamDependencyModel {
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
              valueMode: "empty",
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
                  valueMode: "single",
                  required: true
                },
                [Argument.config]: {
                  name: Argument.config,
                  valueMode: "single",
                  required: false
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
