import { singleton } from "tsyringe";
import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";
import {
  FileExistService,
  FolderNotExistService,
  RunCommandService
} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for unlink project.
 */
export class UnlinkProjectAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly folderDoesNotExist: FolderNotExistService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly runCommand: RunCommandService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  unlinkProject(projectName: string): boolean {
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
    // Unlink the project
    this.simpleMessage.writePlain("Unlink the project");
    this.runCommand.run(`npm uninstall ${project.name} -g`);
    // Write a success message
    // this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project unlinked correctly!", REPOX_LOGO
    );
    return true;
  }
}
// todo: refactor
