import { singleton } from "tsyringe";
import {
  type WsStructureModel
} from "../../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../../enum/ws-structure/ws-structure-entity.enum";
import { EMPTY_STRING } from "@lib/const";
import {
  WorkspaceFolderEnum
} from "../../enum/workspace/workspace-folder.enum";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure (): WsStructureModel[] {
    return [
      /**
       * Remove the node_modules folder in workspace root.
       */
      {
        type: WsStructureEntityEnum.removeFolder,
        value: WorkspaceFolderEnum.node_modules,
        children: []
      },
      /**
       * Folder called projects with apps, libs, tools subfolder.
       * Each subfolder contains .gitkeep file if it is empty.
       * */
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
      },
      /**
       * Create .gitignore file.
       */
      {
        type: WsStructureEntityEnum.createGitignoreFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Remove the package-lock.json file.
       */
      {
        type: WsStructureEntityEnum.removeFile,
        value: WorkspaceFileEnum.packageLockJson,
        children: []
      },
      /**
       * Create tsconfig.json file with filled path section for each
       * typescript library and tool project.
       */
      {
        type: WsStructureEntityEnum.createTsconfigJsonFile,
        value: EMPTY_STRING,
        children: []
      }
    ];
  }
}
