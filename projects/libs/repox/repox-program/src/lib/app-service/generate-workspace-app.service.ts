import { singleton } from "tsyringe";
import { GenerateWsStructureService } from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for generate workspace structure
 * of files and folders.
 */
export class GenerateWorkspaceAppService {
  constructor (
    private readonly generateWsStructure: GenerateWsStructureService
  ) {
  }

  run (): boolean {
    this.generateWsStructure.generateStructure();
    return true;
  }
}
