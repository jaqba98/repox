import { singleton } from "tsyringe";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import { SimpleMessageAppService } from "projects/libs/logger/src";
import {
  BuildProjectAppService
} from "../app-service/build-project-app.service";
import { BuildProjectCommandArgDomainModel } from "projects/libs/param-domain/src";

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

  runSteps(model: BuildProjectCommandArgDomainModel): void {
    this.loggerMessageApp.writeInfo(
      "Build project", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    const { projectName } = model;
    if (!this.buildProjectApp.buildProject(projectName)) return;
  }
}
