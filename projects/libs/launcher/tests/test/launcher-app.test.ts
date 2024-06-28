import { container } from "tsyringe";

import {
  LauncherAppService
} from "../../src/lib/app-service/launcher-app.service";
import {
  Action_1,
  Action_2,
  Action_3
} from "../mock/actions.mock";
import { actionsOutput } from "../mock/actions.mock";

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
    launcher.launch([Action_1, Action_2]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(12);
    const { calls } = consoleLogSpy.mock;
    // Action_1
    expect(calls[0]).toEqual([actionsOutput.a_1_before]);
    expect(calls[1]).toEqual([actionsOutput.a_1_logic]);
    expect(calls[2]).toEqual([actionsOutput.a_1_after]);
    // Action_2
    expect(calls[3]).toEqual([actionsOutput.a_2_before]);
    expect(calls[4]).toEqual([actionsOutput.a_2_logic]);
    // Action_2_1
    expect(calls[5]).toEqual([actionsOutput.a_2_1_before]);
    expect(calls[6]).toEqual([actionsOutput.a_2_1_logic]);
    expect(calls[7]).toEqual([actionsOutput.a_2_1_after]);
    // Action_2_1_1
    expect(calls[8]).toEqual([actionsOutput.a_2_1_1_before]);
    expect(calls[9]).toEqual([actionsOutput.a_2_1_1_logic]);
    expect(calls[10]).toEqual([actionsOutput.a_2_1_1_after]);
    expect(calls[11]).toEqual([actionsOutput.a_2_after]);
    consoleLogSpy.mockRestore();
  });

  test("should skip children actions if parent failed", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    launcher.launch([Action_3]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    const { calls } = consoleLogSpy.mock;
    // Action_3
    expect(calls[0]).toEqual([actionsOutput.a_3_before]);
    expect(calls[1]).toEqual([actionsOutput.a_3_logic]);
    consoleLogSpy.mockRestore();
  });
});
