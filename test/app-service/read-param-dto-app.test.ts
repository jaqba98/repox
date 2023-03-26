import { container } from "tsyringe";
import {
  GetProcessArgvService
} from "../../src/infra/service/reader/get-process-argv.service";
import {
  ReadParamDtoAppService
} from "../../src/app-service/read-param-dto-app.service";
import {
  ParamDtoValidationModel
} from "../../src/infra/model/param-dto/param-dto-validation.model";
import { ParamTypeEnum } from "../../src/infra/enum/param-type.enum";

const child = container.createChildContainer();

const mockGetProcessArgvService = (argv: Array<string>) => {
  child.register(GetProcessArgvService, {
    useClass: class {
      getArgv(): Array<string> {
        return ["executor", "application", ...argv];
      };
    }
  });
};

const runTest = (argv: Array<string> = []): ParamDtoValidationModel => {
  mockGetProcessArgvService(argv);
  const service = child.resolve(ReadParamDtoAppService);
  return service.read();
};

afterEach(() => {
  container.clearInstances();
  container.reset();
});

describe("ReadParamDtoAppService - parameter order", () => {
  test("should be correct for the command: > repox", () => {
    expect(runTest().isError).toBeFalsy();
  });

  test("should be correct for the command: > repox --version", () => {
    expect(runTest(["--version"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate", () => {
    expect(runTest(["generate"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --cache", () => {
    expect(runTest(["generate", "--cache"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox --version --cache", () => {
    expect(runTest(["--version", "--cache"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox --version generate", () => {
    expect(runTest(["--version", "generate"]).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox --version generate --cache", () => {
    expect(runTest(["--version", "generate", "--cache"]).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox generate workspace", () => {
    expect(runTest(["generate", "workspace"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate workspace --type=angular", () => {
    expect(runTest(["generate", "workspace", "--type=angular"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate --cache --type=angular", () => {
    expect(runTest(["generate", "--cache", "--type=angular"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --cache workspace", () => {
    expect(runTest(["generate", "--cache", "workspace"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --cache workspace --name", () => {
    expect(runTest(["generate", "--cache", "workspace", "--name"]).isError).toBeFalsy();
  });
});

describe("ReadParamDtoAppService - parameter structure for program and command", () => {
  test("should be correct for the command: > repox", () => {
    const result = runTest([]);
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
  });

  test("should be correct for the command: > repox generate", () => {
    const result = runTest(["generate"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("generate");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(ParamTypeEnum.program);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("generate");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the command: > repox gener%%a_&te", () => {
    const result = runTest(["gener%%a_&te"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([2]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for gener%%a_&te are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("gener%%a_&te");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(ParamTypeEnum.program);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("gener%%a_&te");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate-workspace", () => {
    const result = runTest(["generate-workspace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("generate-workspace");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(ParamTypeEnum.program);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("generate-workspace");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the command: > repox generate=true", () => {
    const result = runTest(["generate=true"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([2]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for generate=true are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("generate=true");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(ParamTypeEnum.program);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("generate");
    expect(paramValues).toEqual(["true"]);
  });

  test("should be correct for the command: > repox generate workspace", () => {
    const result = runTest(["generate", "workspace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("workspace");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.command);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("workspace");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the command: > repox generate work$$sp&&*ace", () => {
    const result = runTest(["generate", "work$$sp&&*ace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for work$$sp&&*ace are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("work$$sp&&*ace");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.command);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("work$$sp&&*ace");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate workspace-node", () => {
    const result = runTest(["generate", "workspace-node"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("workspace-node");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.command);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("workspace-node");
    expect(paramValues).toEqual([]);
  });

  test('should be correct for the command: > repox generate workspace=true', () => {
    const result = runTest(["generate", "workspace=true"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for workspace=true are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("workspace=true");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.command);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("workspace");
    expect(paramValues).toEqual(["true"]);
  });
});

describe("ReadParamDtoAppService - parameter structure for arguments", () => {
  test("should be correct for the command: > repox generate --name", () => {
    const result = runTest(["generate", "--name"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the command: > repox generate --n$$a%^me", () => {
    const result = runTest(["generate", "--n$$a%^me"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --n$$a%^me are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--n$$a%^me");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("n$$a%^me");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate --name=test", () => {
    const result = runTest(["generate", "--name=test"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=test");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test('should be correct for the command: > repox generate --name="test"', () => {
    const result = runTest(["generate", '--name="test"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('--name="test"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the command: > repox generate --name='test'", () => {
    const result = runTest(["generate", "--name='test'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name='test'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the command: > repox generate --name=`test`", () => {
    const result = runTest(["generate", "--name=`test`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=`test`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be incorrect for the command: > repox generate --name=te$$s&&t", () => {
    const result = runTest(["generate", "--name=te$$s&&t"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=te$$s&&t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name=te$$s&&t");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test('should be incorrect for the command: > repox generate --name="te$$s&&t"', () => {
    const result = runTest(["generate", '--name="te$$s&&t"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=\"te$$s&&t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual('--name="te$$s&&t"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be incorrect for the command: > repox generate --name='te$$s&&t'", () => {
    const result = runTest(["generate", "--name='te$$s&&t'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name='te$$s&&t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name='te$$s&&t'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be incorrect for the command: > repox generate --name=`te$$s&&t`", () => {
    const result = runTest(["generate", "--name=`te$$s&&t`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=`te$$s&&t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name=`te$$s&&t`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be correct for the command: > repox generate --name=test1,test2,test3", () => {
    const result = runTest(["generate", "--name=test1,test2,test3"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=test1,test2,test3");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test('should be correct for the command: > repox generate --name="test1,test2,test3"', () => {
    const result = runTest(["generate", '--name="test1,test2,test3"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('--name="test1,test2,test3"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the command: > repox generate --name='test1,test2,test3'", () => {
    const result = runTest(["generate", "--name='test1,test2,test3'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name='test1,test2,test3'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the command: > repox generate --name=`test1,test2,test3`", () => {
    const result = runTest(["generate", "--name=`test1,test2,test3`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=`test1,test2,test3`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.argument);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });
});

describe("ReadParamDtoAppService - parameter structure for aliases", () => {
  test("should be correct for the command: > repox generate -i", () => {
    const result = runTest(["generate", "-i"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-i");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("i");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate -%", () => {
    const result = runTest(["generate", "-%"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -% are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-%");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("%");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate -name", () => {
    const result = runTest(["generate", "-name"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added incorrect parameter pattern!"]);
    expect(result.tips).toEqual(["Supported pattern for -name are: -<sign> or -<sign>=<value>"]);
    expect(paramBaseValue).toEqual("-name");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the command: > repox generate -n=test", () => {
    const result = runTest(["generate", "-n=test"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=test");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test('should be correct for the command: > repox generate -n="test"', () => {
    const result = runTest(["generate", '-n="test"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('-n="test"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the command: > repox generate -n='test'", () => {
    const result = runTest(["generate", "-n='test'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n='test'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the command: > repox generate -n=`test`", () => {
    const result = runTest(["generate", "-n=`test`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=`test`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be incorrect for the command: > repox generate -n=te%%s$$t", () => {
    const result = runTest(["generate", "-n=te%%s$$t"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=te%%s$$t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n=te%%s$$t");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test('should be incorrect for the command: > repox generate -n="te%%s$$t"', () => {
    const result = runTest(["generate", '-n="te%%s$$t"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=\"te%%s$$t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual('-n="te%%s$$t"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be incorrect for the command: > repox generate -n='te%%s$$t'", () => {
    const result = runTest(["generate", "-n='te%%s$$t'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n='te%%s$$t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n='te%%s$$t'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be incorrect for the command: > repox generate -n=`te%%s$$t`", () => {
    const result = runTest(["generate", "-n=`te%%s$$t`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=`te%%s$$t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n=`te%%s$$t`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be correct for the command: > repox generate -n=test1,test2,test3", () => {
    const result = runTest(["generate", "-n=test1,test2,test3"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=test1,test2,test3");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test('should be correct for the command: > repox generate -n="test1,test2,test3"', () => {
    const result = runTest(["generate", '-n="test1,test2,test3"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('-n="test1,test2,test3"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the command: > repox generate -n='test1,test2,test3'", () => {
    const result = runTest(["generate", "-n='test1,test2,test3'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n='test1,test2,test3'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the command: > repox generate -n=`test1,test2,test3`", () => {
    const result = runTest(["generate", "-n=`test1,test2,test3`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.isError).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=`test1,test2,test3`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(ParamTypeEnum.alias);
    expect(paramHasValue).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });
});
