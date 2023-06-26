import { singleton } from "tsyringe";
// import {
//   DomainConfigStoreService,
//   ProjectAppService
// } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";
import {
  FileUtilsService,
  FolderUtilsService,
  RunCommandUtilsService
} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for build project
 * to the dist folder.
 */
export class BuildProjectAppService {
  constructor(
    private readonly fileExist: FileUtilsService,
    private readonly folderDoesNotExist: FolderUtilsService,
    // private readonly domainConfigStore: DomainConfigStoreService,
    private readonly runCommand: RunCommandUtilsService,
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly fileUtils: FileUtilsService,
    // private readonly projectApp: ProjectAppService
  ) {
  }

  buildProject(projectName: string): boolean {
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
    // const files = this.projectApp.getProjectFiles(project.path);
    // console.log(files);
    // Compile the project
    this.simpleMessage.writePlain("Compile the project");
    // const projectDir = `--project ${project.path}/tsconfig.json`;
    // const distFolder = `./dist/${project.name}`;
    // const outDir = `--outDir ${distFolder}`;
    // this.runCommand.runCommand(`tsc ${projectDir} ${outDir}`);
    // this.runCommand.runCommand(`tsc-alias ${outDir}`);
    // Copy assets
    // project.assets.forEach((asset: any) => {
    //   this.fileUtils.copyFile(
    //     `${asset.inputDir}/${asset.fileName}`,
    //     `${asset.outputDir}/${asset.fileName}`
    //   );
    // })
    // Write a success message
    // this.simpleMessage.writeNewline();
    this.simpleMessage.writeSuccess(
      "Project created correctly!", REPOX_LOGO
    );
    return true;
  }
}

// todo: refactor
