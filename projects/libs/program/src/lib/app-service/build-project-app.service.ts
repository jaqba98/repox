import { singleton } from "tsyringe";
import {
  FolderNotExistService
} from "../infra/folder-not-exist.service";
import { ProjectAppService } from "@lib/project";
import { RunCommandService } from "../infra/run-command.service";
import { FileExistService } from "../infra/file-exist.service";
import { DomainConfigStoreService } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import { CopyFileService } from "../infra/copy-file.service";

@singleton()
/**
 * The app service is responsible for build project
 * to the dist folder.
 */
export class BuildProjectAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly folderDoesNotExist: FolderNotExistService,
    private readonly domainConfigStore: DomainConfigStoreService,
    private readonly projectApp: ProjectAppService,
    private readonly runCommand: RunCommandService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly copyFile: CopyFileService
  ) {
  }

  buildProject(projectName: string): boolean {
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
    // Compile the project
    this.simpleMessage.writePlain("Compile the project", 0);
    const projectDir = `--project ${project.path}/tsconfig.json`;
    const distFolder = `./dist/${project.name}`;
    const outDir = `--outDir ${distFolder}`;
    this.runCommand.exec(`tsc ${projectDir} ${outDir}`);
    this.runCommand.exec(`tsc-alias ${outDir}`);
    // Copy assets
    project.assets.forEach(asset => {
      this.copyFile.copy(
        asset.inputDir, asset.outputDir, asset.fileName
      );
    })
    // Write a success message
    this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project created correctly!", 1, false, true
    );
    return true;
  }
}
