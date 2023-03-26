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
    expect(runTest().isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate", () => {
    expect(runTest(["generate"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox gener%%a_&te", () => {
    expect(runTest(["gener%%a_&te"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate-workspace", () => {
    expect(runTest(["generate-workspace"]).isError).toBeFalsy();
  });

  test('should be incorrect for the command: > repox generate="test"', () => {
    expect(runTest(['generate="test"']).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate workspace", () => {
    expect(runTest(["generate", "workspace"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate work$$sp&&*ace", () => {
    expect(runTest(["generate", "work$$sp&&*ace"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate workspace-node", () => {
    expect(runTest(["generate", "workspace-node"]).isError).toBeFalsy();
  });

  test('should be correct for the command: > repox generate workspace="true"', () => {
    expect(runTest(["generate", 'workspace="true"']).isError).toBeTruthy();
  });
});

describe("ReadParamDtoAppService - parameter structure for arguments", () => {
  test("should be correct for the command: > repox generate --name", () => {
    expect(runTest(["generate", "--name"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate --n$$a%^me", () => {
    expect(runTest(["generate", "--n$$a%^me"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate --name=test", () => {
    expect(runTest(["generate", "--name=test"]).isError).toBeFalsy();
  });

  test('should be correct for the command: > repox generate --name="test"', () => {
    expect(runTest(["generate", '--name="test"']).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --name='test'", () => {
    expect(runTest(["generate", "--name='test'"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --name=`test`", () => {
    expect(runTest(["generate", "--name=`test`"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate --name=te$$s&&t", () => {
    expect(runTest(["generate", "--name=te$$s&&t"]).isError).toBeTruthy();
  });

  test('should be incorrect for the command: > repox generate --name="te$$s&&t"', () => {
    expect(runTest(["generate", '--name="te$$s&&t"']).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox generate --name='te$$s&&t'", () => {
    expect(runTest(["generate", "--name='te$$s&&t'"]).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox generate --name=`te$$s&&t`", () => {
    expect(runTest(["generate", "--name=`te$$s&&t`"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate --name=test1,test2,test3", () => {
    expect(runTest(["generate", "--name=test1,test2,test3"]).isError).toBeFalsy();
  });

  test('should be correct for the command: > repox generate --name="test1,test2,test3"', () => {
    expect(runTest(["generate", '--name="test1,test2,test3"']).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --name='test1,test2,test3'", () => {
    expect(runTest(["generate", "--name='test1,test2,test3'"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate --name=`test1,test2,test3`", () => {
    expect(runTest(["generate", "--name=`test1,test2,test3`"]).isError).toBeFalsy();
  });
});

describe("ReadParamDtoAppService - parameter structure for aliases", () => {
  test("should be correct for the command: > repox generate -i", () => {
    expect(runTest(["generate", "-i"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate -%", () => {
    expect(runTest(["generate", "-%"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate -name", () => {
    expect(runTest(["generate", "-name"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate -n=test", () => {
    expect(runTest(["generate", "-n=test"]).isError).toBeFalsy();
  });

  test('should be correct for the command: > repox generate -n="test"', () => {
    expect(runTest(["generate", '-n="test"']).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate -n='test'", () => {
    expect(runTest(["generate", "-n='test'"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate -n=`test`", () => {
    expect(runTest(["generate", "-n=`test`"]).isError).toBeFalsy();
  });

  test("should be incorrect for the command: > repox generate -n=te%%s$$t", () => {
    expect(runTest(["generate", "-n=te%%s$$t"]).isError).toBeTruthy();
  });

  test('should be incorrect for the command: > repox generate -n="te%%s$$t"', () => {
    expect(runTest(["generate", '-n="te%%s$$t"']).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox generate -n='te%%s$$t'", () => {
    expect(runTest(["generate", "-n='te%%s$$t'"]).isError).toBeTruthy();
  });

  test("should be incorrect for the command: > repox generate -n=`te%%s$$t`", () => {
    expect(runTest(["generate", "-n=`te%%s$$t`"]).isError).toBeTruthy();
  });

  test("should be correct for the command: > repox generate -n=test1,test2,test3", () => {
    expect(runTest(["generate", "-n=test1,test2,test3"]).isError).toBeFalsy();
  });

  test('should be correct for the command: > repox generate -n="test1,test2,test3"', () => {
    expect(runTest(["generate", '-n="test1,test2,test3"']).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate -n='test1,test2,test3'", () => {
    expect(runTest(["generate", "-n='test1,test2,test3'"]).isError).toBeFalsy();
  });

  test("should be correct for the command: > repox generate -n=`test1,test2,test3`", () => {
    const argv = ["generate", "-n=`test1,test2,test3`"];
    const test = runTest(argv);
    const { paramName, paramValues } = test.paramDto.params[3];
    expect(test.isError).toBeFalsy();
    expect(paramName).toEqual("n");
    expect(paramValues).toEqual(["test1", "test2", "test3"]);
  });
});
