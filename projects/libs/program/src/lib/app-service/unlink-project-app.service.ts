import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infra/folder-not-exist.service";
import { ProjectAppService } from "@lib/project";
import { RunCommandService } from "../infra/run-command.service";
import { FileExistService } from "../infra/file-exist.service";
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
    private readonly projectApp: ProjectAppService,
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
    const distFolder = `./dist/${project.name}`;
    this.runCommand.exec(`npm unlink ${distFolder}`);
    // Write a success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project unlinked correctly!", 1, false, true
    );
    return true;
  }
}
