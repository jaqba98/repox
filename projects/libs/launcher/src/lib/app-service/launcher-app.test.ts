import { container } from "tsyringe";

import { LauncherAppService } from "./launcher-app.service";

describe("LauncherApp", () => {
  let launcher: LauncherAppService;

  beforeAll(() => {
    launcher = container.resolve(LauncherAppService);
  });

  afterAll(() => {
    container.reset();
    container.clearInstances();
  });

  it("Should execute all actions in the correct way", () => {
    expect(launcher.launch([])).toBeTruthy();
  });
});
