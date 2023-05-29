import { singleton } from "tsyringe";
import { GenerateProjectCommandArgModel } from "@lib/param-domain";
import { DomainConfigAppService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  SystemVerificationAppService
} from "../app-service/system-verification-app.service";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly domainConfigApp: DomainConfigAppService,
    private readonly systemVerification: SystemVerificationAppService,
    private readonly loggerMessageApp: SimpleMessageAppService
  ) {
  }

  runSteps(commandModel: GenerateProjectCommandArgModel): void {
    this.loggerMessageApp.writeInfo(
      "Project generation", 1, true, true
    );
    if (!this.systemVerification.checkSystem()) return;
    this.domainConfigApp.loadDomainConfig();
    const { name } = commandModel;
    this.domainConfigApp.addProject(name);
    this.domainConfigApp.saveDomainConfig();
  }
}
