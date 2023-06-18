import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infrastructure/folder-not-exist.service";
import { RunCommandService } from "../infrastructure/run-command.service";
import { FileExistService } from "../infrastructure/file-exist.service";
import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";

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
      "Check whether the project exist", 0
    );
    if (!this.domainConfigStore.existProject(projectName)) {
      this.simpleMessage.writeError(
        `The ${projectName} not exist!`, 0, false, true
      );
      return false;
    }
    // Get project data
    this.simpleMessage.writePlain("Get project data", 0);
    const project = this.domainConfigStore.getProject(projectName);
    // Unlink the project
    this.simpleMessage.writePlain("Unlink the project", 0);
    this.runCommand.run(`npm uninstall ${project.name} -g`);
    // Write a success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project unlinked correctly!", 1, false, true
    );
    return true;
  }
}
