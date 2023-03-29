import { container } from "tsyringe";
import { CommandEnum } from "../../enum/command.enum";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto.model";
import {
  ReadParamDomainAppService
} from "../read-param-domain-app.service";
import { ProgramEnum } from "../../enum/program.enum";
import { ParamTypeEnum } from "../../infra/enum/param-type.enum";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../enum/argument.enum";
import {
  GetParamDependenceService
} from "../../dom-service/service/get-param-dependence.service";

/**
 * Testing of the ReadParamDomainAppService service.
 */

class MockGetParamDependenceService {
  getParamDependence(
    program: ProgramEnum
  ): ParamDependencyModel | undefined {
    switch (program) {
      case ProgramEnum.default:
        return {
          commands: {
            [CommandEnum.default]: {
              commandName: CommandEnum.default,
              args: {}
            }
          },
          args: {}
        };
      case ProgramEnum.unknown:
        return undefined;
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

  test("Should be incorrect for default program with not supported argument", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "--version",
        paramIndex: 2,
        paramType: ParamTypeEnum.argument,
        paramHasValue: false,
        paramName: "version",
        paramValues: []
      }
    ]);
    const paramDomainResult: ParamDomainValidationModel = {
      isError: true,
      wrongParamIndexes: [2],
      errors: ["You have specified not existed arguments for program!"],
      tips: ["You have to specify only existed arguments."],
      paramDomain: {
        program: {
          name: ProgramEnum.default,
          index: 1,
          args: [
            {
              name: ArgumentEnum.version,
              value: [],
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
    }
    expect(service.build(paramDto)).toEqual(paramDomainResult);
  });
});
