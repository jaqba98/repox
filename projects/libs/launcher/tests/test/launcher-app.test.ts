// TODO: refactor the test
import { container } from "tsyringe";

import {
  LauncherAppService
} from "../../src/lib/app-service/launcher-app.service";
import { ActionA } from "../mock/actions-order.mock";
import { ActionsOrderEnum } from "../enum/actions-order.enum";

describe("LauncherApp tests", () => {
  let launcher: LauncherAppService;

  beforeAll(() => {
    launcher = container.resolve(LauncherAppService);
  });

  afterAll(() => {
    container.reset();
    container.clearInstances();
  });

  test("should execute all actions in the correct order", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    launcher.launch([ActionA]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy.mock.calls[0])
      .toEqual([ActionsOrderEnum.aBefore]);
    expect(consoleLogSpy.mock.calls[1])
      .toEqual([ActionsOrderEnum.aLogic]);
    expect(consoleLogSpy.mock.calls[2])
      .toEqual([ActionsOrderEnum.aAfter]);
    consoleLogSpy.mockRestore();
  });
});
