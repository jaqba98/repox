import { singleton } from "tsyringe";
import {
  type WsStructureModel
} from "../../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../../enum/ws-structure/ws-structure-entity.enum";
import {
  WorkspaceFolderEnum
} from "../../enum/workspace/workspace-folder.enum";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure (): WsStructureModel[] {
    return [
      {
        type: WsStructureEntityEnum.folder,
        value: WorkspaceFolderEnum.projects,
        children: [
          {
            type: WsStructureEntityEnum.folder,
            value: WorkspaceFolderEnum.apps,
            children: []
          },
          {
            type: WsStructureEntityEnum.folder,
            value: WorkspaceFolderEnum.libs,
            children: []
          },
          {
            type: WsStructureEntityEnum.folder,
            value: WorkspaceFolderEnum.tools,
            children: []
          }
        ]
      }
    ];
  }
}
