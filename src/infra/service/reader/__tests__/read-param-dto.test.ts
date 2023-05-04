import { ReadParamDtoService } from "../read-param-dto.service";
import { container } from "tsyringe";
import {
  ParamDtoModel
} from "../../../model/param-dto/param-dto-model";
import { ReadProcessArgvService } from "../read-process-argv.service";
import { ParamType } from "../../../enum/param-type";

/** Testing of the ReadParamDtoService service. */

class MockReadProcessArgvService {
  getArgv(): Array<string> {
    return [
      "node",
      "application",
      "program",
      "--argument1",
      "--argument2=val1",
      "--argument3='val1,val2'",
      "command",
      "-a",
      "-b=val1",
      "-c='val1,val2'"
    ];
  }
}

describe("ReadParamDtoService", () => {
  const child = container.createChildContainer();
  child.register(ReadProcessArgvService, {
    useClass: MockReadProcessArgvService
  });
  const readParamDto = child.resolve(ReadParamDtoService);

  afterAll(() => {
    container.clearInstances();
  });

  test("Should correctly build param DTO model", () => {
    expect(readParamDto.read()).toEqual<ParamDtoModel>({
      params: [
        {
          paramBaseValue: "node",
          paramIndex: 0,
          paramType: ParamType.executor,
          paramHasValue: false,
          paramName: "node",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "application",
          paramIndex: 1,
          paramType: ParamType.application,
          paramHasValue: false,
          paramName: "application",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "program",
          paramIndex: 2,
          paramType: ParamType.program,
          paramHasValue: false,
          paramName: "program",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "--argument1",
          paramIndex: 3,
          paramType: ParamType.argument,
          paramHasValue: false,
          paramName: "argument1",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "--argument2=val1",
          paramIndex: 4,
          paramType: ParamType.argument,
          paramHasValue: true,
          paramName: "argument2",
          paramValues: ["val1"],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "--argument3='val1,val2'",
          paramIndex: 5,
          paramType: ParamType.argument,
          paramHasValue: true,
          paramName: "argument3",
          paramValues: ["val1", "val2"],
          paramHasManyValues: true
        },
        {
          paramBaseValue: "command",
          paramIndex: 6,
          paramType: ParamType.command,
          paramHasValue: false,
          paramName: "command",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "-a",
          paramIndex: 7,
          paramType: ParamType.alias,
          paramHasValue: false,
          paramName: "a",
          paramValues: [],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "-b=val1",
          paramIndex: 8,
          paramType: ParamType.alias,
          paramHasValue: true,
          paramName: "b",
          paramValues: ["val1"],
          paramHasManyValues: false
        },
        {
          paramBaseValue: "-c='val1,val2'",
          paramIndex: 9,
          paramType: ParamType.alias,
          paramHasValue: true,
          paramName: "c",
          paramValues: ["val1", "val2"],
          paramHasManyValues: true
        }
      ]
    });
  })
});
