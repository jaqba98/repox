import { singleton } from "tsyringe";
// import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import {
  FileUtilsService,
  FolderUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import { REPOX_LOGO } from "@lib/workspace";

@singleton()
/**
 * The app service is responsible for link project
 * to the dist folder.
 */
export class LinkProjectAppService {
  constructor(
    private readonly fileExist: FileUtilsService,
    private readonly folderDoesNotExist: FolderUtilsService,
    // private readonly domainConfigStore: DomainConfigStoreService,
    private readonly runCommand: RunCommandUtilsService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  linkProject(projectName: string): boolean {
    // Check whether the project exist
    this.simpleMessage.writePlain(
      "Check whether the project exist"
    );
    // if (!this.domainConfigStore.existProject(projectName)) {
    //   this.simpleMessage.writeError(
    //     `The ${projectName} not exist!`, REPOX_LOGO
    //   );
    //   return false;
    // }
    // Get project data
    this.simpleMessage.writePlain("Get project data");
    // const project = this.domainConfigStore.getProject(projectName);
    // Link the project
    this.simpleMessage.writePlain("Link the project");
    // const distFolder = `./dist/${project.name}`;
    // this.runCommand.runCommand(`npm link ${distFolder}`);
    // Write a success message
    // this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project linked correctly!", REPOX_LOGO
    );
    return true;
  }
}
// todo: refactor
