import { ProgramEnum } from "../../../parameter/src/enum/program.enum";
import { CommandEnum } from "../../../parameter/src/enum/command.enum";
import { ArgumentEnum } from "../../../parameter/src/enum/argument.enum";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../../parameter/src/model/param-dto/param-dto.model";
import { container } from "tsyringe";
import { ReadParamDomainApp } from "../read-param-domain-app";
import {
  ParamDomainValidationModel
} from "../../../parameter/src/model/param-domain/param-domain-validation.model";
import { ParamTypeEnum } from "../../../parameter/src/enum/param-type.enum";

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
      paramType: ParamTypeEnum.argument,
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
          name: ProgramEnum.default,
          index: 1,
          args: [
            {
              baseName: "version",
              name: ArgumentEnum.version,
              values: [],
              index: 2,
              hasValue: false,
              hasManyValues: false
            }
          ]
        },
        command: {
          baseName: "",
          name: CommandEnum.default,
          index: 3,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for not existed command name", () => {
    const paramDto: ParamDtoModel = buildParamDto([{
      paramBaseValue: "test",
      paramIndex: 2,
      paramType: ParamTypeEnum.command,
      paramHasValue: false,
      paramName: "test",
      paramValues: [],
      paramHasManyValues: false
    }]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      success: false,
      wrongParamIndexes: [2],
      errors: ["You have specified not existed command!"],
      tips: [
        "You have to specify correct command name.",
        "Check the documentation to get full list of commands."
      ],
      paramDomain: {
        program: {
          baseName: "",
          name: ProgramEnum.default,
          index: 1,
          args: []
        },
        command: {
          baseName: "test",
          name: CommandEnum.unknown,
          index: 2,
          args: []
        }
      }
    });
  });

  test("Should be incorrect for not existed command name for command", () => {
    const paramDto: ParamDtoModel = buildParamDto([
      {
        paramBaseValue: "generate",
        paramIndex: 2,
        paramType: ParamTypeEnum.program,
        paramHasValue: false,
        paramName: "generate",
        paramValues: [],
        paramHasManyValues: false
      },
      {
        paramBaseValue: "test",
        paramIndex: 3,
        paramType: ParamTypeEnum.command,
        paramHasValue: false,
        paramName: "test",
        paramValues: [],
        paramHasManyValues: false
      }
    ]);
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
      success: false,
      wrongParamIndexes: [3],
      errors: ["You have specified not existed command!"],
      tips: [
        "You have to specify correct command name.",
        "Check the documentation to get full list of commands."
      ],
      paramDomain: {
        program: {
          baseName: "generate",
          name: ProgramEnum.generate,
          index: 2,
          args: []
        },
        command: {
          baseName: "test",
          name: CommandEnum.unknown,
          index: 3,
          args: []
        }
      }
    });
  });
});
