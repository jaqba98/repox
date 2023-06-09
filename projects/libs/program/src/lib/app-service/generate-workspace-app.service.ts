import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  FolderNotExistService
} from "../infra/folder-not-exist.service";

@singleton()
/**
 * The app service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly loggerMessageApp: SimpleMessageAppService,
    private readonly folderNotExist: FolderNotExistService
    // private readonly createFolder: CreateFolderService,
    // private readonly goInto: GoIntoService,
    // private readonly runCommand: RunCommandService,
    // private readonly createEmptyFile: CreateEmptyFileService,
    // private readonly buildConfigFile: BuildConfigFileAppService,
    // private readonly writeFile: WriteFileService,
    // private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  generateWorkspace(workspaceName: string): boolean {
    // Check whether the workspace folder not exist
    if (!this.folderNotExist.exist(workspaceName)) {
      return false;
    }
    // this.createFolder.create(workspaceName);
    // this.goInto.goInto(workspaceName);
    // this.runCommand.exec("git init");
    // this.runCommand.exec("npm init -y");
    // this.runCommand.exec("npm install typescript --save-dev");
    // this.runCommand.exec("npm install jest --save-dev");
    // this.runCommand.exec("tsc --init")
    // this.writeFile.writeJson<TsconfigDomainModel>("tsconfig.json", {
    //   compilerOptions: {
    //     paths: {}
    //   }
    // });
    // this.createFolder.create("projects");
    // this.createFolder.create("projects/apps");
    // this.createEmptyFile.create("projects/apps/.gitkeep");
    // this.createFolder.create("projects/libs");
    // this.createEmptyFile.create("projects/libs/.gitkeep");
    // this.createFolder.create("projects/tools");
    // this.createEmptyFile.create("projects/tools/.gitkeep");
    // this.createEmptyFile.create(DomainConfigFileEnum.configJson);
    // const config = this.buildConfigFile.buildEmptyDomainConfig();
    // this.writeFile.writeJson(DomainConfigFileEnum.configJson, config);
    // this.createEmptyFile.create(".gitignore");
    // this.writeFile.writeText(".gitignore", GIT_IGNORE_CONTENT);
    // this.runCommand.exec("git add .");
    // this.runCommand.exec(`git commit -m "init commit"`);
    // this.goInto.goInto("..");
    // this.simpleMessage.writeNewline();
    // this.simpleMessage.writeSuccess(
    //   "Workspace created correctly!", 1, false, true
    // );
    return true;
  }
}

// todo: refactor