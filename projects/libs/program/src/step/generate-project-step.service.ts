import { singleton } from "tsyringe";
import { LoggerMessageAppService } from "@lib/logger";
import { DomainConfigAppService } from "@lib/domain";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly loggerMessageApp: LoggerMessageAppService,
    private readonly domainConfigApp: DomainConfigAppService
  ) {
  }

  runSteps(): boolean {
    this.loggerMessageApp.writeInfo("Running the command: Generate Project", true, true, 1);
    this.domainConfigApp.loadDomainConfig();
    const data = this.domainConfigApp.getDomainConfig();
    this.domainConfigApp.saveDomainConfig();
    return true;
  }
}
// todo: refactor