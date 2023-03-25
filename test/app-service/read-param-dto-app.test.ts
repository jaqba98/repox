import { container } from "tsyringe";
import {
  GetProcessArgvService
} from "../../src/infra/service/reader/get-process-argv.service";
import {
  ReadParamDtoAppService
} from "../../src/app-service/read-param-dto-app.service";

describe("ReadParamDtoAppService", () => {
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
  const runTest = (argv: Array<string> = []): boolean => {
    mockGetProcessArgvService(argv);
    const service = child.resolve(ReadParamDtoAppService);
    return service.read().isError;
  };

  afterEach(() => {
    container.clearInstances();
    container.reset();
  });

  test("should be correct for the command: > repox", () => {
    expect(runTest()).toBeFalsy();
  });

  test("should be correct for the command: > repox generate", () => {
    expect(runTest(["generate"])).toBeFalsy();
  });

  test("should be correct for the command: > repox generate workspace", () => {
    expect(runTest(["generate", "workspace"])).toBeFalsy();
  });
});
