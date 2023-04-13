import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infrastructure/model/param-dto/param-dto.model";
import { ParamTypeEnum } from "../../infrastructure/enum/param-type.enum";
import { container } from "tsyringe";
import {
  GetParamDependenceService
} from "../../dom-service/service/get-param-dependence.service";
import {
  ReadParamDomainAppService
} from "../read-param-domain-app.service";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

/** Testing of the ReadParamDomainAppService service. */

class MockGetParamDependenceService {
  getParamDependence(
    program: ProgramEnum
  ): ParamDependencyModel {
    switch (program) {
      case ProgramEnum.default:
        return {
          programName: ProgramEnum.default,
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            }
          },
          args: {
            [ArgumentEnum.version]: {
              argName: ArgumentEnum.version,
              required: true
            }
          }
        };
      case ProgramEnum.generate:
        return {
          programName: ProgramEnum.generate,
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            },
            [CommandEnum.workspace]: {
              commandName: CommandEnum.default,
              args: {
                [ArgumentEnum.version]: {
                  argName: ArgumentEnum.version,
                  required: true
                }
              }
            }
          },
          args: {
            [ArgumentEnum.version]: {
              argName: ArgumentEnum.version,
              required: true
            }
          }
        };
      case ProgramEnum.unknown:
        return {
          programName: ProgramEnum.unknown,
          commands: {},
          args: {}
        }
      default:
        throw new Error(
          "Failed to find param dependency for given param!"
        );
    }
  }
}

const buildParamDto = (
  entities: Array<ParamDtoEntityModel> = []
): ParamDtoModel => {
  return {
    params: [
      {
        paramBaseValue: "node.exe",
        paramIndex: 0,
        paramType: ParamTypeEnum.executor,
        paramHasValue: false,
        paramName: "node.exe",
        paramValues: []
      },
      {
        paramBaseValue: "repox.js",
        paramIndex: 1,
        paramType: ParamTypeEnum.application,
        paramHasValue: false,
        paramName: "repox.js",
        paramValues: []
      },
      ...entities
    ]
  };
};

describe("ReadParamDomainAppService", () => {
  const child = container.createChildContainer();
  child.register(GetParamDependenceService, {
    useClass: MockGetParamDependenceService
  });
  const service = child.resolve(ReadParamDomainAppService);

  afterAll(() => {
    container.clearInstances();
    container.reset();
  });

  test("Should be incorrect for default program with not correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "--cache",
      paramIndex: 2,
      paramType: ParamTypeEnum.argument,
      paramHasValue: false,
      paramName: "cache",
      paramValues: []
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [],
      errors: ["You have not specified required arguments for program!"],
      tips: [
        "You have to specify all required arguments.",
        "Missing arguments: version"
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.default,
          index: 1,
          args: [
            {
              name: ArgumentEnum.unknown,
              values: [],
              index: 2,
              isAlias: false
            }
          ]
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be correct for default program with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "--version",
      paramIndex: 2,
      paramType: ParamTypeEnum.argument,
      paramHasValue: false,
      paramName: "version",
      paramValues: []
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain: {
        program: {
          name: ProgramEnum.default,
          index: 1,
          args: [
            {
              name: ArgumentEnum.version,
              values: [],
              index: 2,
              isAlias: false
            }
          ]
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for not existed program name", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "test",
      paramIndex: 2,
      paramType: ParamTypeEnum.program,
      paramHasValue: false,
      paramName: "test",
      paramValues: []
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [2],
      errors: ["You have specified not existed program!"],
      tips: [
        "You have to specify correct program name.",
        "Check the documentation to get full list of programs."
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.unknown,
          index: 2,
          args: []
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for default command with not correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "generate",
      paramIndex: 2,
      paramType: ParamTypeEnum.program,
      paramHasValue: false,
      paramName: "generate",
      paramValues: []
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [],
      errors: ["You have not specified required arguments for program!"],
      tips: [
        "You have to specify all required arguments.",
        "Missing arguments: version"
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: []
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be correct for default command with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: ParamTypeEnum.program,
        paramHasValue: false,
        paramName: "generate",
        paramValues: []
      },
      {
        paramBaseValue: "--version",
        paramIndex: 3,
        paramType: ParamTypeEnum.argument,
        paramHasValue: false,
        paramName: "version",
        paramValues: []
      }
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: [
            {
              name: ArgumentEnum.version,
              values: [],
              index: 3,
              isAlias: false
            }
          ]
        },
        command: {
          name: CommandEnum.default,
          index: 4,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for not existed command name for program", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: ParamTypeEnum.program,
        paramHasValue: false,
        paramName: "generate",
        paramValues: []
      },
      {
        paramBaseValue: "test",
        paramIndex: 3,
        paramType: ParamTypeEnum.command,
        paramHasValue: false,
        paramName: "test",
        paramValues: []
      }
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [],
      errors: ["You have specified not existed command for given program!"],
      tips: [
        "You have to specify correct command name.",
        "Check the documentation to get full list of commands."
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: []
        },
        command: {
          name: CommandEnum.unknown,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for command with incorrect arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: ParamTypeEnum.program,
        paramHasValue: false,
        paramName: "generate",
        paramValues: []
      },
      {
        paramBaseValue: "--version",
        paramIndex: 3,
        paramType: ParamTypeEnum.argument,
        paramHasValue: false,
        paramName: "version",
        paramValues: []
      },
      {
        paramBaseValue: "workspace",
        paramIndex: 4,
        paramType: ParamTypeEnum.command,
        paramHasValue: false,
        paramName: "workspace",
        paramValues: []
      }
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [],
      errors: [
        "You have not specified required arguments for command!"
      ],
      tips: [
        "You have to specify all required arguments.",
        "Missing arguments: version"
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: [
            {
              name: ArgumentEnum.version,
              values: [],
              index: 3,
              isAlias: false
            }
          ]
        },
        command: {
          name: CommandEnum.workspace,
          index: 4,
          args: []
        }
      }
    });
  });

  test("Should be correct for command with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: ParamTypeEnum.program,
        paramHasValue: false,
        paramName: "generate",
        paramValues: []
      },
      {
        paramBaseValue: "--version",
        paramIndex: 3,
        paramType: ParamTypeEnum.argument,
        paramHasValue: false,
        paramName: "version",
        paramValues: []
      },
      {
        paramBaseValue: "workspace",
        paramIndex: 4,
        paramType: ParamTypeEnum.command,
        paramHasValue: false,
        paramName: "workspace",
        paramValues: []
      },
      {
        paramBaseValue: "--version",
        paramIndex: 5,
        paramType: ParamTypeEnum.argument,
        paramHasValue: false,
        paramName: "version",
        paramValues: []
      },
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: false,
      wrongParamIndexes: [],
      errors: [],
      tips: [],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: [
            {
              name: ArgumentEnum.version,
              values: [],
              index: 3,
              isAlias: false
            }
          ]
        },
        command: {
          name: CommandEnum.workspace,
          index: 4,
          args: [
            {
              name: ArgumentEnum.version,
              values: [],
              index: 5,
              isAlias: false
            }
          ]
        }
      }
    });
  });
});
// todo: fix it