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
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure (): WsStructureModel[] {
    return [
      {
        type: WsStructureEntityEnum.removeFolder,
        value: WorkspaceFolderEnum.node_modules,
        children: []
      },
      {
        type: WsStructureEntityEnum.createFolder,
        value: WorkspaceFolderEnum.projects,
        children: [
          {
            type: WsStructureEntityEnum.createFolder,
            value: WorkspaceFolderEnum.apps,
            children: [
              {
                type: WsStructureEntityEnum.createGitkeepFile,
                value: EMPTY_STRING,
                children: []
              }
            ]
          },
          {
            type: WsStructureEntityEnum.createFolder,
            value: WorkspaceFolderEnum.libs,
            children: [
              {
                type: WsStructureEntityEnum.createGitkeepFile,
                value: EMPTY_STRING,
                children: []
              }
            ]
          },
          {
            type: WsStructureEntityEnum.createFolder,
            value: WorkspaceFolderEnum.tools,
            children: [
              {
                type: WsStructureEntityEnum.createGitkeepFile,
                value: EMPTY_STRING,
                children: []
              }
            ]
          }
        ]
      }
    ];
  }
}
