import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { GenerateWsStructureService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for generating workspace.
 */
export class GenerateWorkspaceAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly generateWsStructure: GenerateWsStructureService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain(`Step: Generate Workspace`);
    this.generateWsStructure.generateStructure();
    return true;
  }
}
