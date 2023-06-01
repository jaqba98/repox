import { singleton } from "tsyringe";
import { BuildProjectCommandArgModel } from "@lib/param-domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  BuildProjectAppService
} from "../app-service/build-project-app.service";

@singleton()
/**
 * The list of steps for the build project program.
 */
export class BuildProjectStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly buildProjectApp: BuildProjectAppService
  ) {
  }

  runSteps(commandModel: BuildProjectCommandArgModel): void {
    this.loggerMessageApp.writeInfo(
      "Build project", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    const { name } = commandModel;
    if (!this.buildProjectApp.buildProject(name)) return;
  }
}
// todo: refactor