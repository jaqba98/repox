import { singleton } from "tsyringe";
import {
  WsStructureModel
} from "../../model/ws-structure/ws-structure.model";
import {
  WsStructureEnum
} from "../../enum/ws-structure/ws-structure.enum";
import {
  WorkspaceFolderEnum
} from "../../enum/workspace/workspace-folder.enum";
import { EMPTY_STRING } from "@lib/const";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure(): WsStructureModel[] {
    return [
      /**
       * Folder called projects with apps, libs and tools folders.
       * Each folder contains .gitkeep file if it is empty.
       * */
      {
        type: WsStructureEnum.createFolder,
        value: WorkspaceFolderEnum.projects,
        children: [
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.apps,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          },
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.libs,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          },
          {
            type: WsStructureEnum.createFolder,
            value: WorkspaceFolderEnum.tools,
            children: [
              {
                type: WsStructureEnum.createEmptyFileWhenFolderEmpty,
                value: WorkspaceFileEnum.gitkeep,
                children: []
              }
            ]
          }
        ]
      },
      // todo: I am here
      /**
       * Create .gitignore file.
       */
      {
        type: WsStructureEnum.createGitignoreFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Create .eslintrc.js file.
       */
      {
        type: WsStructureEnum.createEslintrcJsFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Create jest.config.ts configuration in root of workspace.
       */
      {
        type: WsStructureEnum.createRootJestConfigTsFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Remove the package-lock.json file.
       */
      {
        type: WsStructureEnum.removeFile,
        value: WorkspaceFileEnum.packageLockJson,
        children: []
      },
      /**
       * Remove the package.json then generate default package.json
       * and install all needed npm.
       */
      {
        type: WsStructureEnum.removeFile,
        value: WorkspaceFileEnum.packageJson,
        children: [
          {
            type: WsStructureEnum.execCommand,
            value: `npm init -y`,
            children: [
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @types/node@20.5.8 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @typescript-eslint/parser@6.5.0 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @typescript-eslint/eslint-plugin@6.5.0 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i eslint@8.48.0 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i jest@29.6.4 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @types/jest@29.5.4 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i repox@1.4.12 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i ts-jest@29.1.1 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i ts-node@10.9.1 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i tsc-alias@1.8.7 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i typescript@5.2.2 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i command-exists@1.2.9`,
                children: []
              },
              // additional
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @types/command-exists@1.2.0 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @types/core-js@2.5.5 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i @types/lodash@4.14.197 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i htmlpro@1.1.11 -D`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i core-js@3.32.1`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i glob@10.3.3`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i jsonschema@1.4.1`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i lodash@4.17.21`,
                children: []
              },
              {
                type: WsStructureEnum.execCommand,
                value: `npm i tsyringe@4.8.0`,
                children: []
              }
            ]
          }
        ]
      },
      /**
       * Create repox.json file.
       */
      {
        type: WsStructureEnum.createRepoxJsonFile,
        value: EMPTY_STRING,
        children: []
      },
      /**
       * Create tsconfig.json file with filled path section for each
       * typescript library and tool project.
       */
      {
        type: WsStructureEnum.createTsconfigJsonFile,
        value: EMPTY_STRING,
        children: []
      }
    ];
  }
}
