import { singleton } from "tsyringe";
import {
  BuildWsStructureService,
  WorkspaceFileEnum
} from "@lib/repox-workspace";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService
} from "@lib/utils";
import {
  type WsStructureModel
} from "../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../enum/ws-structure/ws-structure-entity.enum";
import {
  BuildTsconfigJsonService
} from "../dom-service/builder/build-tsconfig-json.service";
import { EMPTY_STRING } from "@lib/const";
import {
  BuildGitignoreService
} from "../dom-service/builder/build-gitignore.service";

@singleton()
/**
 * The service is responsible for generate workspace structure
 * and then save it on the disc.
 */
export class GenerateWsStructureService {
  private currentPath: string[] = [];

  constructor (
    private readonly buildWsStructure: BuildWsStructureService,
    private readonly pathUtils: PathUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly folderUtils: FolderUtilsService,
    private readonly buildTsconfigJson: BuildTsconfigJsonService,
    private readonly buildGitignore: BuildGitignoreService
  ) {
  }

  generateStructure (): void {
    this.currentPath = [];
    const wsStructureModels = this.buildWsStructure.buildStructure();
    this.processGenerateStructure(wsStructureModels);
  }

  private processGenerateStructure (
    wsStructureModels: WsStructureModel[]
  ): void {
    wsStructureModels.forEach(wsStructureModel => {
      switch (wsStructureModel.type) {
        case WsStructureEntityEnum.createFolder:
          this.processCreateFolder(wsStructureModel);
          break;
        case WsStructureEntityEnum.removeFile:
          this.processRemoveFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.createGitkeepFile:
          this.processCreateGitkeepFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.createGitignoreFile:
          this.processCreateGitignoreFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.createTsconfigJsonFile:
          this.processCreateTsconfigJsonFile(wsStructureModel);
          break;
        default:
          throw new Error(
            `Not supported workspace structure entity!`
          );
      }
    });
  }

  private processCreateFolder (
    wsStructureModel: WsStructureModel
  ): void {
    this.currentPath.push(wsStructureModel.value);
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    if (this.pathUtils.notExistPath(folderPath)) {
      this.folderUtils.createFolder(folderPath);
    }
    this.processGenerateStructure(wsStructureModel.children);
    this.currentPath.pop();
  }

  private processRemoveFile (
    wsStructureModel: WsStructureModel
  ): void {
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    const filePath = this.pathUtils.createPath(
      folderPath, wsStructureModel.value
    );
    if (this.pathUtils.existPath(filePath)) {
      this.fileUtils.removeFile(filePath);
    }
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processCreateGitkeepFile (
    wsStructureModel: WsStructureModel
  ): void {
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    if (this.folderUtils.isEmpty(folderPath)) {
      const gitkeepPath = this.pathUtils.createPath(
        folderPath, WorkspaceFileEnum.gitkeepText
      );
      this.fileUtils.writeTextFile(gitkeepPath, EMPTY_STRING);
    }
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processCreateGitignoreFile (
    wsStructureModel: WsStructureModel
  ): void {
    const gitignorePath = this.pathUtils.createPath(
      ...this.currentPath, WorkspaceFileEnum.gitignoreText
    );
    this.fileUtils.writeTextFile(
      gitignorePath, this.buildGitignore.build()
    );
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processCreateTsconfigJsonFile (
    wsStructureModel: WsStructureModel
  ): void {
    const tsconfigJsonPath = this.pathUtils.createPath(
      ...this.currentPath, WorkspaceFileEnum.tsconfigJson
    );
    this.fileUtils.writeJsonFile(
      tsconfigJsonPath, this.buildTsconfigJson.build()
    );
    this.processGenerateStructure(wsStructureModel.children);
  }
}
