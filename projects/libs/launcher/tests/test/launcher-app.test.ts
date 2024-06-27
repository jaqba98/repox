import { container } from "tsyringe";

import {
  LauncherAppService
} from "../../src/lib/app-service/launcher-app.service";
import {
  Action_1,
  Action_2,
  Action_3
} from "../mock/actions-order.mock";
import { actionsOutputMsg } from "../mock/actions-msg.mock";

describe("LauncherApp tests", () => {
  let launcher: LauncherAppService;

  beforeAll(() => launcher = container.resolve(LauncherAppService));

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
    expect(calls[0]).toEqual([actionsOutputMsg.action_1_before]);
    expect(calls[1]).toEqual([actionsOutputMsg.action_1_logic]);
    expect(calls[2]).toEqual([actionsOutputMsg.action_1_after]);
    // Action_2
    expect(calls[3]).toEqual([actionsOutputMsg.action_2_before]);
    expect(calls[4]).toEqual([actionsOutputMsg.action_2_logic]);
    // Action_2_1
    expect(calls[5]).toEqual([actionsOutputMsg.action_2_1_before]);
    expect(calls[6]).toEqual([actionsOutputMsg.action_2_1_logic]);
    expect(calls[7]).toEqual([actionsOutputMsg.action_2_1_after]);
    // Action_2_1_1
    expect(calls[8]).toEqual([actionsOutputMsg.action_2_1_1_before]);
    expect(calls[9]).toEqual([actionsOutputMsg.action_2_1_1_logic]);
    expect(calls[10]).toEqual([actionsOutputMsg.action_2_1_1_after]);
    expect(calls[11]).toEqual([actionsOutputMsg.action_2_after]);
    consoleLogSpy.mockRestore();
  });

  test("should skip children actions if parent failed", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    launcher.launch([Action_3]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    const { calls } = consoleLogSpy.mock;
    // Action_3
    expect(calls[0]).toEqual([actionsOutputMsg.action_3_before]);
    expect(calls[1]).toEqual([actionsOutputMsg.action_3_logic]);
    consoleLogSpy.mockRestore();
  });
});
