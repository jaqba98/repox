// Refactored file
import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { ProjectAppService } from "@lib/project";
import {
  DomainConfigStoreService,
  repoxDmFile,
  tsconfigDmFile
} from "@lib/domain";
import {
  FolderNotExistService
} from "../infrastructure/folder-not-exist.service";

@singleton()
/**
 * The app service is responsible for checking
 * whether a given project does not exist.
 */
export class ProjectNotExistAppService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly project: ProjectAppService,
    private readonly store: DomainConfigStoreService,
    private readonly folderNotExist: FolderNotExistService,
  ) {
  }

  checkProjectNotExist(
    projectName: string,
    projectType: string,
    projectPath: string
  ): boolean {
    // Display header message.
    this.simple.writePlain("Check that the project does not exist");
    // Check whether project does not exist in the repox.json file.
    if (!this.projectNotExistInRepoxJson(projectName)) return false;
    // Check whether project alias does not exist
    // in the tsconfig.json file.
    if (!this.aliasNotExistInTsconfigJson(projectName, projectType)) {
      return false;
    }
    // Check whether project folder does not exist in the given path.
    return this.projectFolderNotExistInPath(
      projectName, projectType, projectPath
    );
  }

  private projectNotExistInRepoxJson(
    projectName: string
  ): boolean {
    if (this.store.existProject(projectName)) {
      this.simple.writeError(
        `The ${projectName} project exists in the ${repoxDmFile}`,
        0, false, true
      );
      this.simple.writeWarning(
        "Enter a different project name", 0, false, true
      );
      return false;
    }
    return true;
  }

  private aliasNotExistInTsconfigJson(
    projectName: string,
    projectType: string
  ): boolean {
    const alias = this.project.getProjectAlias(
      projectType, projectName
    );
    if (this.store.existAlias(alias)) {
      this.simple.writeError(
        `The ${projectName} alias exists in the ${tsconfigDmFile}`, 0,
        false, true
      );
      this.simple.writeWarning(
        "Enter a different project name", 0, false, true
      );
      return false;
    }
    return true;
  }

  private projectFolderNotExistInPath(
    projectName: string,
    projectType: string,
    projectPath: string
  ): boolean {
    const projectFullPath = this.project.getProjectPath(
      projectName, projectType, projectPath
    );
    if (this.folderNotExist.checkNotExist(projectFullPath)) {
      return true;
    }
    this.simple.writeError(
      `The ${projectFullPath} path already exist`, 0, false, true
    );
    this.simple.writeWarning(
      "Enter a different project path", 0, false, true
    );
    return false;
  }
}
