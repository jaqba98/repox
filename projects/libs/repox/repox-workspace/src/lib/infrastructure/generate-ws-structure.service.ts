import { singleton } from "tsyringe";
import {
  BuildWsStructureService,
  WorkspaceFileEnum
} from "@lib/repox-workspace";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  type WsStructureModel
} from "../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../enum/ws-structure/ws-structure-entity.enum";
import {
  BuildTsconfigJsonService
} from "../dom-service/builder/build-tsconfig-json.service";

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
    private readonly buildTsconfigJson: BuildTsconfigJsonService
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
