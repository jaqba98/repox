import { Program } from "../../../enum/program";
import { Command } from "../../../enum/command";
import { Argument } from "../../../enum/argument";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../../infra/model/param-dto/param-dto-model";
import { container } from "tsyringe";
import { ReadParamDomainApp } from "../read-param-domain-app";
import {
  ParamDomainValidationModel
} from "../../../model/param-domain/param-domain-validation-model";
import { ParamType } from "../../../infra/enum/param-type";

/** Testing of the ReadParamDomainApp. */

// class MockGetParamDependenceService {
//   getParamDependence(
//     command: Program
//   ): ParamDependencyModel {
//     switch (command) {
//       case Program.default:
//         return {
//           command: Program.default,
//           commands: {
//             [Command.default]: {
//               command: Command.default,
//               args: {}
//             }
//           },
//           args: {
//             [Argument.version]: {
//               name: Argument.version,
//               mustHasValue: false,
//               mustHasManyValues: false,
//               required: true
//             }
//           }
//         };
//       case Program.generate:
//         return {
//           command: Program.generate,
//           commands: {
//             [Command.default]: {
//               command: Command.default,
//               args: {}
//             },
//             [Command.workspace]: {
//               command: Command.default,
//               args: {
//                 [Argument.version]: {
//                   name: Argument.version,
//                   mustHasValue: false,
//                   mustHasManyValues: false,
//                   required: true
//                 }
//               }
//             }
//           },
//           args: {
//             [Argument.version]: {
//               name: Argument.version,
//               mustHasValue: false,
//               mustHasManyValues: false,
//               required: true
//             }
//           }
//         };
//       case Program.unknown:
//         return {
//           command: Program.unknown,
//           commands: {},
//           args: {}
//         }
//       default:
//         throw new Error(
//           "Failed to find param dependency for given param!"
//         );
//     }
//   }
// }

const buildParamDto = (
  entities: Array<ParamDtoEntityModel> = []
): ParamDtoModel => {
  return {
    params: [
      {
        paramBaseValue: "node.exe",
        paramIndex: 0,
        paramType: "executor",
        paramHasValue: false,
        paramName: "node.exe",
        paramValues: [],
        paramHasManyValues: false
      },
      {
        paramBaseValue: "repox.js",
        paramIndex: 1,
        paramType: <any>"application",
        paramHasValue: false,
        paramName: "repox.js",
        paramValues: [],
        paramHasManyValues: false
      },
      ...entities
    ]
  };
};

describe("ReadParamDomainAppService", () => {
  const child = container.createChildContainer();
  // child.register(GetParamDependency, {
  //   useClass: MockGetParamDependenceService
  // });
  const service = child.resolve(ReadParamDomainApp);

  afterAll(() => {
    container.clearInstances();
    container.reset();
  });

  test("Should be correct for default command with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "--version",
      paramIndex: 2,
      paramType: ParamType.argument,
      paramHasValue: false,
      paramName: "version",
      paramValues: [],
      paramHasManyValues: false
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      success: true,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain: {
        program: {
          baseName: "",
          name: Program.default,
          index: 1,
          args: [
            {
              baseName: "version",
              name: Argument.version,
              values: [],
              index: 2,
              hasValue: false,
              hasManyValues: false
            }
          ]
        },
        command: {
          baseName: "",
          name: Command.default,
          index: 3,
          args: []
        }
      }
    });
  });

  // test("Should be incorrect for not existed command name", () => {
  //   const paramDto: ParamDtoModel = buildParamDto([{
  //     paramBaseValue: "test",
  //     paramIndex: 2,
  //     paramType: <any>"command",
  //     paramHasValue: false,
  //     paramName: "test",
  //     paramValues: [],
  //     paramHasManyValues: false
  //   }]);
  //   expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
  //     isError: true,
  //     wrongParamIndexes: [2],
  //     errors: ["You have specified not existed command!"],
  //     tips: [
  //       "You have to specify correct command name.",
  //       "Check the documentation to get full list of programs."
  //     ],
  //     paramDomain: {
  //       command: {
  //         name: Program.unknown,
  //         index: 2,
  //         args: {}
  //       },
  //       command: {
  //         name: Command.default,
  //         index: 3,
  //         args: {}
  //       }
  //     }
  //   });
  // });
  //
  // test("Should be incorrect for not existed command name for command", () => {
  //   const paramDto: ParamDtoModel = buildParamDto([
  //     {
  //       paramBaseValue: "generate",
  //       paramIndex: 2,
  //       paramType: <any>"command",
  //       paramHasValue: false,
  //       paramName: "generate",
  //       paramValues: [],
  //       paramHasManyValues: false
  //     },
  //     {
  //       paramBaseValue: "test",
  //       paramIndex: 3,
  //       paramType: <any>"command",
  //       paramHasValue: false,
  //       paramName: "test",
  //       paramValues: [],
  //       paramHasManyValues: false
  //     }
  //   ]);
  //   expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
  //     isError: true,
  //     wrongParamIndexes: [3],
  //     errors: ["You have specified not existed command for given command!"],
  //     tips: [
  //       "You have to specify correct command name.",
  //       "Check the documentation to get full list of commands."
  //     ],
  //     paramDomain: {
  //       command: {
  //         name: Program.generate,
  //         index: 2,
  //         args: {}
  //       },
  //       command: {
  //         name: Command.unknown,
  //         index: 3,
  //         args: {}
  //       }
  //     }
  //   });
  // });
  //
  // test("Should be correct for command with correct arguments", () => {
  //   const paramDto: ParamDtoModel = buildParamDto([
  //     {
  //       paramBaseValue: "generate",
  //       paramIndex: 2,
  //       paramType: <any>"command",
  //       paramHasValue: false,
  //       paramName: "generate",
  //       paramValues: [],
  //       paramHasManyValues: false
  //     },
  //     {
  //       paramBaseValue: "workspace",
  //       paramIndex: 3,
  //       paramType: <any>"command",
  //       paramHasValue: false,
  //       paramName: "workspace",
  //       paramValues: [],
  //       paramHasManyValues: false
  //     },
  //     {
  //       paramBaseValue: "--name",
  //       paramIndex: 4,
  //       paramType: <any>"argument",
  //       paramHasValue: false,
  //       paramName: "name",
  //       paramValues: [],
  //       paramHasManyValues: false
  //     },
  //   ]);
  //   expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
  //     isError: false,
  //     wrongParamIndexes: [],
  //     errors: [],
  //     tips: [],
  //     paramDomain: {
  //       command: {
  //         name: Program.generate,
  //         index: 2,
  //         args: {}
  //       },
  //       command: {
  //         name: Command.workspace,
  //         index: 3,
  //         args: {
  //           config: {
  //             name: "config",
  //             values: undefined,
  //             index: undefined,
  //             hasValue: undefined,
  //             hasManyValues: undefined,
  //             isDefined: false
  //           },
  //           name: {
  //             name: Argument.name,
  //             values: [],
  //             index: 4,
  //             hasValue: false,
  //             hasManyValues: false,
  //             isDefined: true
  //           }
  //         }
  //       }
  //     }
  //   });
  // });
});
// todo: refactor this
