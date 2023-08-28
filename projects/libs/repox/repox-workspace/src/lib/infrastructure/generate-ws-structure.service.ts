import { singleton } from "tsyringe";
import {
  BuildWsStructureService,
  WorkspaceFileEnum
} from "@lib/repox-workspace";
import {
  type WsStructureModel
} from "../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../enum/ws-structure/ws-structure-entity.enum";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService
} from "@lib/utils";

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
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService
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
    wsStructureModels.forEach(wsModel => {
      switch (wsModel.type) {
        case WsStructureEntityEnum.folder:
          this.processFolderEntity(wsModel);
          break;
        case WsStructureEntityEnum.gitkeep:
          this.processGitkeepEntity(wsModel);
          break;
        default:
          throw new Error(
            `Not supported workspace structure entity!`
          );
      }
    });
  }

  private processFolderEntity (wsModel: WsStructureModel): void {
    this.currentPath.push(wsModel.value);
    const newFolder = this.pathUtils.createPath(...this.currentPath);
    if (this.pathUtils.notExistPath(newFolder)) {
      this.folderUtils.createFolder(newFolder);
    }
    this.processGenerateStructure(wsModel.children);
    this.currentPath.pop();
  }

  private processGitkeepEntity (wsModel: WsStructureModel): void {
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    if (this.pathUtils.folderIsEmpty(folderPath)) {
      const gitkeepPath = this.pathUtils.createPath(
        folderPath, WorkspaceFileEnum.gitkeepText
      );
      this.fileUtils.createEmptyFile(gitkeepPath);
    }
    this.processGenerateStructure(wsModel.children);
  }
}
