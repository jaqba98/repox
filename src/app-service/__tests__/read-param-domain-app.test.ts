import {ReadParamDomainAppService} from "../read-param-domain-app.service";
import {container} from "tsyringe";
import {ParamTypeEnum} from "../../infra/enum/param-type.enum";
import {ParamDtoModel} from "../../infra/model/param-dto/param-dto.model";
import {ParamDomainValidationModel} from "../../model/param-domain/param-domain-validation.model";
import {CommandEnum} from "../../enum/command.enum";
import {ProgramEnum} from "../../enum/program.enum";

describe("ReadParamDomainAppService", () => {
  const service = container.resolve(ReadParamDomainAppService);

  test("true", () => {
    const paramDto: ParamDtoModel = {
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
        }
      ]
    };
    const result: ParamDomainValidationModel = {
      errors: [],
      isError: false,
      paramDomain: {
        program: {
          args: [],
          index: 1,
          name: ProgramEnum.default
        },
        command: {
          args: [],
          index: 2,
          name: CommandEnum.default
        }
      },
      tips: [],
      wrongParamIndexes: [],
    }
    expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>(result);
  });
});
