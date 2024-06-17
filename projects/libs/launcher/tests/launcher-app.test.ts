// TODO: Refacter the test
import { container } from "tsyringe";

import {
  LauncherAppService
} from "../src/lib/app-service/launcher-app.service";
import {
  ActionModel,
  ActionResultModel
} from "../src/lib/model/action.model";
import { ActionStatusEnum } from "../src/lib/enum/action.enum";

class A implements ActionModel {
  runBefore(): ActionResultModel {
    console.log("A before");
    return { status: ActionStatusEnum.completed, actions: [] };
  }
  
  runLogic(): ActionResultModel {
    console.log("A logic");
    return { status: ActionStatusEnum.completed, actions: [] };
  }

  runAfter(): ActionResultModel {
    console.log("A after");
    return { status: ActionStatusEnum.completed, actions: [] };
  }
}

describe("LauncherApp", () => {
  let launcher: LauncherAppService;

  beforeAll(() => {
    launcher = container.resolve(LauncherAppService);
  });

  afterAll(() => {
    container.reset();
    container.clearInstances();
  });

  test("Should execute all actions in the correct way", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    launcher.launch([A]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy.mock.calls[0]).toEqual(["A before"]);
    expect(consoleLogSpy.mock.calls[1]).toEqual(["A logic"]);
    expect(consoleLogSpy.mock.calls[2]).toEqual(["A after"]);
    consoleLogSpy.mockRestore();
  });
});
