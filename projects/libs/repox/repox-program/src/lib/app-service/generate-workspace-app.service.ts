import {singleton} from "tsyringe";

@singleton()
/**
 * The app service is responsible for generating workspace.
 */
export class GenerateWorkspaceAppService {
  // constructor (
  //   private readonly simpleMessage: SimpleMessageAppService,
  //   private readonly generateWsStructure: GenerateWsStructureService
  // ) {
  // }

  run(): boolean {
    // this.simpleMessage.writePlain(`Step: Generate Workspace`);
    // this.generateWsStructure.generateStructure();
    return true;
  }
}
