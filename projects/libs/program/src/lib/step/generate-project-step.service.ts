import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";
import {
  GenerateProjectAppService
} from "../app-service/generate-project-app.service";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly generateProjectApp: GenerateProjectAppService
  ) {
  }

  runSteps(): void {
    // this.loggerMessageApp.writeInfo(
    //   "Project generation", 1, true, true
    // );
    // if (!this.systemVerification.checkSystem()) return;
    // const { name, type } = commandModel;
    // if (!this.generateProjectApp.generateProject(name, type)) return;
  }
}
// todo: refactor