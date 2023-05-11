import { ParamTypeEnum } from "../../enum/param-type.enum";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto.model";
import { container } from "tsyringe";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../enum/program.enum";
import { ArgumentEnum } from "../../enum/argument.enum";
import { CommandEnum } from "../../enum/command.enum";
import {
  ReadParamDomainAppService
} from "../read-param-domain-app.service";


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
  const service = child.resolve(ReadParamDomainAppService);

  afterAll(() => {
    container.clearInstances();
    container.reset();
  });

  test("Should be correct for default program with correct arguments", () => {
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

  test("Should be incorrect for not existed program name", () => {
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
      errors: ["You have specified not existed program!"],
      tips: [
        "You have to specify correct program name.",
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

  test("Should be incorrect for not existed program name for program", () => {
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
      errors: ["You have specified not existed program!"],
      tips: [
        "You have to specify correct program name.",
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
