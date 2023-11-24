import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {ProjectTypeEnum, WsDomainStoreService} from "@lib/repox-workspace";

@singleton()
/**
 * The app service is responsible for build project
 * to the dist folder.
 */
export class BuildProjectAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDomainStore: WsDomainStoreService,
    ) {
    }

    run(projectName: string): boolean {
        this.simpleMessage.writePlain(`Step: Build Project`);
        const project = this.wsDomainStore.getProject(projectName);
        if (project === undefined) {
            throw new Error(`The project name does not exist in the ws domain`);
        }
        if (project.type !== ProjectTypeEnum.appTs) {
            this.simpleMessage.writeError(`Could not build a project of type ${project.type}.`);
            this.simpleMessage.writeError(`It it only possible to build applications!`);
            this.simpleMessage.writeError(`Other types of projects will be build as dependencies!`);
            return false;
        }
        // // if (buildWatch) {
        // //   this.buildProjectAppTypescript(project);
        // //   this.buildWatch(project);
        // //   return true;
        // // }
        // this.buildProjectAppTypescript(project);
        // this.newline.writeNewline();
        // this.simpleMessage.writeSuccess(`Project built correctly`);
        return true;
    }

    // private buildWatch (project: WsProjectDomainModel): void {
    //   const watcher = watch(
    //     WorkspaceFolderEnum.projects, { recursive: true }
    //   );
    //   watcher.on(`change`, (_, filename): void => {
    //     if (this.folderUtils.isFolder(filename.toString())) {
    //       this.simpleMessage.writePlain(`Rebuilding the project`);
    //     }
    //     this.buildProjectAppTypescript(project);
    //     if (this.folderUtils.isFolder(filename.toString())) {
    //       this.simpleMessage.writeSuccess(`Project built correctly`);
    //     }
    //   });
    // }

    // private buildProjectAppTypescript (
    //   project: WsProjectDomainModel
    // ): boolean {
    //   const projectTsconfig = this.pathUtils.createPath(
    //     project.path, WorkspaceFileEnum.tsconfigJsonFile
    //   );
    //   if (!this.pathUtils.existPath(projectTsconfig)) {
    //     this.simpleMessage.writeError(
    //       `There is no tsconfig.json file for the project.`
    //     );
    //     return false;
    //   }
    //   const projectArg = `--project ${projectTsconfig}`;
    //   // const distArg = `--outDir ${project.build.output}`;
    //   const distArg = `--outDir`;
    //   this.runCommandUtils.runNpxCommand(
    //     `tsc ${projectArg} ${distArg} --noEmit`, true
    //   );
    //   this.runCommandUtils.runNpxCommand(
    //     `tsc ${projectArg} ${distArg}`, true
    //   );
    //   this.runCommandUtils.runNpxCommand(
    //     `tsc-alias ${distArg}`, true
    //   );
    //   // this.copyAssets(project.build.assets);
    //   return true;
    // }

    // private copyAssets (assets: WsAssetsDomainModel[]): void {
    //   assets
    //     .map(asset => ({
    //       output: asset.output,
    //       files: this.fileUtils.readProjectFiles(asset.input)
    //     }))
    //     .map(asset => asset.files.map(file => ({
    //       file, output: asset.output
    //     })))
    //     .flat()
    //     .forEach(asset => { this.fileUtils.copyFile(asset.file, asset.output); }
    //     );
    // }
}
