import { expect, test } from "@jest/globals";
import {
  container,
  delay,
  inject,
  injectable,
  singleton
} from "tsyringe";
import { ParamTypeEnum } from "../infra/enum/param-type.enum";
import {
  ParamDtoValidationService
} from "../infra/service/validation/param-dto-validation.service";

describe("", () => {
  const service = container.resolve(ParamDtoValidationService);

  test("true", () => {
    expect(service.runValidation({
        params: [
          {
            paramBaseValue: 'C:\\Program Files\\nodejs\\node.exe',
            paramIndex: 0,
            paramType: ParamTypeEnum.executor,
            paramHasValue: false,
            paramName: 'C:\\Program Files\\nodejs\\node.exe',
            paramValues: []
          },
          {
            paramBaseValue: 'C:\\Users\\jakub\\AppData\\Roaming\\npm\\node_modules\\repox\\bin\\repox.js',
            paramIndex: 1,
            paramType: ParamTypeEnum.application,
            paramHasValue: false,
            paramName: 'C:\\Users\\jakub\\AppData\\Roaming\\npm\\node_modules\\repox\\bin\\repox.js',
            paramValues: []
          }
        ]
      }
    ).isError).toBeFalsy();
  });
});
