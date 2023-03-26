import { container } from "tsyringe";
import {
  ReadParamDomainAppService
} from "../../src/app-service/read-param-domain-app.service";
import {
  ParamDtoModel
} from "../../src/infra/model/param-dto/param-dto.model";
import { ParamTypeEnum } from "../../src/infra/enum/param-type.enum";
import {
  ParamDomainValidationModel
} from "../../src/model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../src/enum/program.enum";
import { CommandEnum } from "../../src/enum/command.enum";

test("test", () => {
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
  const service = container.resolve(ReadParamDomainAppService);
  expect(service.build(paramDto)).toEqual<ParamDomainValidationModel>({
    isError: false,
    wrongParamIndexes: [],
    errors: [],
    tips: [],
    paramDomain: {
      program: {
        name: ProgramEnum.default,
        index: 1,
        args: []
      },
      command: {
        name: CommandEnum.default,
        index: 2,
        args: []
      }
    }
  });
});
