import { ProgramEnum } from "../../enum/program.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { CommandEnum } from "../../enum/command.enum";
import { ArgumentEnum } from "../../enum/argument.enum";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";
import { container } from "tsyringe";
import {
  GetParamDependenceService
} from "../../dom-service/service/get-param-dependence.service";
import {
  ReadParamDomainAppService
} from "../service/read-param-domain-app.service";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";

/** Testing of the ReadParamDomainAppService. */

class MockGetParamDependenceService {
  getParamDependence(
    program: ProgramEnum
  ): ParamDependencyModel {
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
              mustHasValue: false,
              mustHasManyValues: false,
              required: true
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
              command: CommandEnum.default,
              args: {
                [ArgumentEnum.version]: {
                  name: ArgumentEnum.version,
                  mustHasValue: false,
                  mustHasManyValues: false,
                  required: true
                }
              }
            }
          },
          args: {
            [ArgumentEnum.version]: {
              name: ArgumentEnum.version,
              mustHasValue: false,
              mustHasManyValues: false,
              required: true
            }
          }
        };
      case ProgramEnum.unknown:
        return {
          program: ProgramEnum.unknown,
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
  child.register(GetParamDependenceService, {
    useClass: MockGetParamDependenceService
  });
  const service = child.resolve(ReadParamDomainAppService);

  afterAll(() => {
    container.clearInstances();
    container.reset();
  });

  test("Should be correct for default program with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "--version",
      paramIndex: 2,
      paramType: <any>"argument",
      paramHasValue: false,
      paramName: "version",
      paramValues: [],
      paramHasManyValues: false
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
          args: {
            version: {
              name: ArgumentEnum.version,
              values: [],
              index: 2,
              hasValue: false,
              hasManyValues: false,
              isDefined: true
            },
            clean: {
              name: ArgumentEnum.clean,
              values: undefined,
              index: undefined,
              hasValue: undefined,
              hasManyValues: undefined,
              isDefined: false
            }
          }
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: {}
        }
      }
    });
  });

  test("Should be incorrect for not existed program name", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "test",
      paramIndex: 2,
      paramType: <any>"program",
      paramHasValue: false,
      paramName: "test",
      paramValues: [],
      paramHasManyValues: false
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
          args: {}
        },
        command: {
          name: CommandEnum.default,
          index: 3,
          args: {}
        }
      }
    });
  });

  test("Should be incorrect for not existed command name for program", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: <any>"program",
        paramHasValue: false,
        paramName: "generate",
        paramValues: [],
        paramHasManyValues: false
      },
      {
        paramBaseValue: "test",
        paramIndex: 3,
        paramType: <any>"command",
        paramHasValue: false,
        paramName: "test",
        paramValues: [],
        paramHasManyValues: false
      }
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      isError: true,
      wrongParamIndexes: [3],
      errors: ["You have specified not existed command for given program!"],
      tips: [
        "You have to specify correct command name.",
        "Check the documentation to get full list of commands."
      ],
      paramDomain: {
        program: {
          name: ProgramEnum.generate,
          index: 2,
          args: {}
        },
        command: {
          name: CommandEnum.unknown,
          index: 3,
          args: {}
        }
      }
    });
  });

  test("Should be correct for command with correct arguments", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: <any>"program",
        paramHasValue: false,
        paramName: "generate",
        paramValues: [],
        paramHasManyValues: false
      },
      {
        paramBaseValue: "workspace",
        paramIndex: 3,
        paramType: <any>"command",
        paramHasValue: false,
        paramName: "workspace",
        paramValues: [],
        paramHasManyValues: false
      },
      {
        paramBaseValue: "--name",
        paramIndex: 4,
        paramType: <any>"argument",
        paramHasValue: false,
        paramName: "name",
        paramValues: [],
        paramHasManyValues: false
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
          args: {}
        },
        command: {
          name: CommandEnum.workspace,
          index: 3,
          args: {
            config: {
              name: "config",
              values: undefined,
              index: undefined,
              hasValue: undefined,
              hasManyValues: undefined,
              isDefined: false
            },
            name: {
              name: ArgumentEnum.name,
              values: [],
              index: 4,
              hasValue: false,
              hasManyValues: false,
              isDefined: true
            }
          }
        }
      }
    });
  });
});
