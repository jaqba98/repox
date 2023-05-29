import { singleton } from "tsyringe";
import { GenerateProjectCommandArgModel } from "@lib/param-domain";
import { DomainConfigAppService } from "@lib/domain";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly domainConfigApp: DomainConfigAppService
  ) {
  }

  runSteps(commandModel: GenerateProjectCommandArgModel): boolean {
    this.domainConfigApp.loadDomainConfig();
    const { name } = commandModel;
    this.domainConfigApp.addProject(name);
    this.domainConfigApp.saveDomainConfig();
    return true;
  }
}
