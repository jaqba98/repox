import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infrastructure/folder-not-exist.service";
import { RunCommandService } from "../infrastructure/run-command.service";
import { FileExistService } from "../infrastructure/file-exist.service";
import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The app service is responsible for link project
 * to the dist folder.
 */
export class LinkProjectAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly folderDoesNotExist: FolderNotExistService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly runCommand: RunCommandService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  linkProject(projectName: string): boolean {
    // Check whether the project exist
    this.simpleMessage.writePlain(
      "Check whether the project exist"
    );
    if (!this.domainConfigStore.existProject(projectName)) {
      this.simpleMessage.writeError(
        `The ${projectName} not exist!`, REPOX_LOGO
      );
      return false;
    }
    // Get project data
    this.simpleMessage.writePlain("Get project data");
    const project = this.domainConfigStore.getProject(projectName);
    // Link the project
    this.simpleMessage.writePlain("Link the project");
    const distFolder = `./dist/${project.name}`;
    this.runCommand.run(`npm link ${distFolder}`);
    // Write a success message
    // this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project linked correctly!", REPOX_LOGO
    );
    return true;
  }
}
// todo: refactor
