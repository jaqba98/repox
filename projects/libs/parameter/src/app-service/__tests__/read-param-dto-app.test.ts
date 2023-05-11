import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";
import { container, DependencyContainer } from "tsyringe";
import {
  ReadArgvService
} from "../../infrastructure/read-argv.service";
import { ReadParamDtoAppService } from "../read-param-dto-app.service";

const runTest = (argv: Array<string>): ParamDtoValidationModel => {
  const child: DependencyContainer = container.createChildContainer();
  child.register(ReadArgvService, {
    useClass: class {
      getArgv(): Array<string> {
        return ["executor", "application", ...argv];
      }
    }
  });
  return child.resolve(ReadParamDtoAppService).read();
};

afterEach(() => {
  container.clearInstances();
  container.reset();
});

describe("ReadParamDtoAppService - parameter order", () => {
  test("Should be correct for the program: repox", () => {
    expect(runTest([]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox -v", () => {
    expect(runTest(["-v"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g", () => {
    expect(runTest(["g"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g -c", () => {
    expect(runTest(["g", "-c"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox -v -c", () => {
    expect(runTest(["-v", "-c"]).success).toBeTruthy();
  });

  test("Should be incorrect for the program: repox -v g", () => {
    expect(runTest(["-v", "g"]).success).toBeFalsy();
  });

  test("Should be incorrect for the program: repox -v g -c", () => {
    expect(runTest(["-v", "g", "-c"]).success).toBeFalsy();
  });

  test("Should be correct for the program: repox g w", () => {
    expect(runTest(["g", "w"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g w -t=test", () => {
    expect(runTest(["g", "w", "-t=test"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g -c -t", () => {
    expect(runTest(["g", "-c", "-t"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g -c w", () => {
    expect(runTest(["g", "-c", "w"]).success).toBeTruthy();
  });

  test("Should be correct for the program: repox g -c w -n", () => {
    expect(runTest(["g", "-c", "w", "-n"]).success).toBeTruthy();
  });
});

describe("ReadParamDtoAppService - parameter structure", () => {
  test("Should be correct for the program: repox", () => {
    const result = runTest([]);
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
  });

  test("Should be correct for the program: repox g", () => {
    const result = runTest(["generate"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("generate");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual("program");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("generate");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox gener%%a_&te", () => {
    const result = runTest(["gener%%a_&te"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([2]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for gener%%a_&te are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("gener%%a_&te");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual("program");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("gener%%a_&te");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the program: repox generate-workspace", () => {
    const result = runTest(["generate-workspace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("generate-workspace");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual("program");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("generate-workspace");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox generate=true", () => {
    const result = runTest(["generate=true"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([2]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for generate=true are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("generate=true");
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual("program");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("generate");
    expect(paramValues).toEqual(["true"]);
  });

  test("should be correct for the program: repox generate workspace", () => {
    const result = runTest(["generate", "workspace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("workspace");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("command");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("workspace");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox generate work$$sp&&*ace", () => {
    const result = runTest(["generate", "work$$sp&&*ace"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for work$$sp&&*ace are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("work$$sp&&*ace");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("command");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("work$$sp&&*ace");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the program: repox generate workspace-node", () => {
    const result = runTest(["generate", "workspace-node"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("workspace-node");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("command");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("workspace-node");
    expect(paramValues).toEqual([]);
  });

  test('should be correct for the program: repox generate workspace=true', () => {
    const result = runTest(["generate", "workspace=true"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for workspace=true are: [a-z] [A-Z] [0-9] [-]"]);
    expect(paramBaseValue).toEqual("workspace=true");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("command");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("workspace");
    expect(paramValues).toEqual(["true"]);
  });
});

describe("ReadParamDtoAppService - parameter structure for arguments", () => {
  test("should be correct for the program: repox generate --name", () => {
    const result = runTest(["generate", "--name"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox generate --n$$a%^me", () => {
    const result = runTest(["generate", "--n$$a%^me"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --n$$a%^me are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--n$$a%^me");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n$$a%^me");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the program: repox generate --name=test", () => {
    const result = runTest(["generate", "--name=test"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=test");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test('should be correct for the program: repox generate --name="test"', () => {
    const result = runTest(["generate", '--name="test"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('--name="test"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the program: repox generate --name='test'", () => {
    const result = runTest(["generate", "--name='test'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name='test'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the program: repox generate --name=`test`", () => {
    const result = runTest(["generate", "--name=`test`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=`test`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be incorrect for the program: repox generate --name=te$$s&&t", () => {
    const result = runTest(["generate", "--name=te$$s&&t"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=te$$s&&t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name=te$$s&&t");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test('should be incorrect for the program: repox generate --name="te$$s&&t"', () => {
    const result = runTest(["generate", '--name="te$$s&&t"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=\"te$$s&&t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual('--name="te$$s&&t"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be incorrect for the program: repox generate --name='te$$s&&t'", () => {
    const result = runTest(["generate", "--name='te$$s&&t'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name='te$$s&&t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name='te$$s&&t'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be incorrect for the program: repox generate --name=`te$$s&&t`", () => {
    const result = runTest(["generate", "--name=`te$$s&&t`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for --name=`te$$s&&t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("--name=`te$$s&&t`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["te$$s&&t"]);
  });

  test("should be correct for the program: repox generate --name=test1,test2,test3", () => {
    const result = runTest(["generate", "--name=test1,test2,test3"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=test1,test2,test3");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test('should be correct for the program: repox generate --name="test1,test2,test3"', () => {
    const result = runTest(["generate", '--name="test1,test2,test3"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('--name="test1,test2,test3"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the program: repox generate --name='test1,test2,test3'", () => {
    const result = runTest(["generate", "--name='test1,test2,test3'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name='test1,test2,test3'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the program: repox generate --name=`test1,test2,test3`", () => {
    const result = runTest(["generate", "--name=`test1,test2,test3`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("--name=`test1,test2,test3`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("argument");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });
});

describe("ReadParamDtoAppService - parameter structure for aliases", () => {
  test("should be correct for the program: repox generate -i", () => {
    const result = runTest(["generate", "-i"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-i");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("i");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox generate -%", () => {
    const result = runTest(["generate", "-%"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -% are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-%");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("%");
    expect(paramValues).toEqual([]);
  });

  test("should be incorrect for the program: repox generate -name", () => {
    const result = runTest(["generate", "-name"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have used incorrect parameter pattern!"]);
    expect(result.tips).toEqual(["Correct pattern for -name is: -<sign> or -<sign>=<value>"]);
    expect(paramBaseValue).toEqual("-name");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("name");
    expect(paramValues).toEqual([]);
  });

  test("should be correct for the program: repox generate -n=test", () => {
    const result = runTest(["generate", "-n=test"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=test");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test('should be correct for the program: repox generate -n="test"', () => {
    const result = runTest(["generate", '-n="test"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('-n="test"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the program: repox generate -n='test'", () => {
    const result = runTest(["generate", "-n='test'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n='test'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be correct for the program: repox generate -n=`test`", () => {
    const result = runTest(["generate", "-n=`test`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=`test`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test"]);
  });

  test("should be incorrect for the program: repox generate -n=te%%s$$t", () => {
    const result = runTest(["generate", "-n=te%%s$$t"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=te%%s$$t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n=te%%s$$t");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test('should be incorrect for the program: repox generate -n="te%%s$$t"', () => {
    const result = runTest(["generate", '-n="te%%s$$t"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=\"te%%s$$t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual('-n="te%%s$$t"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be incorrect for the program: repox generate -n='te%%s$$t'", () => {
    const result = runTest(["generate", "-n='te%%s$$t'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n='te%%s$$t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n='te%%s$$t'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be incorrect for the program: repox generate -n=`te%%s$$t`", () => {
    const result = runTest(["generate", "-n=`te%%s$$t`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeFalsy();
    expect(result.wrongParamIndexes).toEqual([3]);
    expect(result.errors).toEqual(["You have added not supported characters!"]);
    expect(result.tips).toEqual(["Supported characters for -n=`te%%s$$t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
    expect(paramBaseValue).toEqual("-n=`te%%s$$t`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["te%%s$$t"]);
  });

  test("should be correct for the program: repox generate -n=test1,test2,test3", () => {
    const result = runTest(["generate", "-n=test1,test2,test3"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=test1,test2,test3");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test('should be correct for the program: repox generate -n="test1,test2,test3"', () => {
    const result = runTest(["generate", '-n="test1,test2,test3"']);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual('-n="test1,test2,test3"');
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the program: repox generate -n='test1,test2,test3'", () => {
    const result = runTest(["generate", "-n='test1,test2,test3'"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n='test1,test2,test3'");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });

  test("should be correct for the program: repox generate -n=`test1,test2,test3`", () => {
    const result = runTest(["generate", "-n=`test1,test2,test3`"]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.success).toBeTruthy();
    expect(result.wrongParamIndexes).toEqual([]);
    expect(result.errors).toEqual([]);
    expect(result.tips).toEqual([]);
    expect(paramBaseValue).toEqual("-n=`test1,test2,test3`");
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual("alias");
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });
});
