import { singleton } from "tsyringe";
import { BuildWsStructureService } from "@lib/repox-workspace";
import { FolderUtilsService, PathUtilsService } from "@lib/utils";
import {
  type WsStructureModel
} from "../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../enum/ws-structure/ws-structure-entity.enum";

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
    private readonly folderUtils: FolderUtilsService
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
        case WsStructureEntityEnum.folder:
          this.processFolderEntity(wsStructureModel);
          break;
        default:
          throw new Error(
            `Not supported workspace structure entity!`
          );
      }
    });
  }

  private processFolderEntity (
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
}
