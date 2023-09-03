import { singleton } from "tsyringe";
import {
  BuildWsStructureService,
  WorkspaceFileEnum
} from "@lib/repox-workspace";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService, RunCommandUtilsService
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
import {
  BuildRepoxJsonService
} from "../dom-service/builder/build-repox-json.service";
import {
  BuildJestConfigTsService
} from "../dom-service/builder/build-jest-config-ts.service";
import {
  BuildEslintrcJsService
} from "../dom-service/builder/build-eslintrc-js.service";

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
    private readonly buildRepoxJson: BuildRepoxJsonService,
    private readonly buildTsconfigJson: BuildTsconfigJsonService,
    private readonly buildGitignore: BuildGitignoreService,
    private readonly buildJestConfigTs: BuildJestConfigTsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly buildEslintrcTs: BuildEslintrcJsService
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
        case WsStructureEntityEnum.removeFolder:
          this.processRemoveFolder(wsStructureModel);
          break;
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
        case WsStructureEntityEnum.createRootJestConfigTsFile:
          this.processCreateRootJestConfigTsFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.createRepoxJsonFile:
          this.processCreateRepoxJsonFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.createTsconfigJsonFile:
          this.processCreateTsconfigJsonFile(wsStructureModel);
          break;
        case WsStructureEntityEnum.execCommand:
          this.processExecCommand(wsStructureModel);
          break;
        case WsStructureEntityEnum.createEslintrcJsFile:
          this.processCreateEslintrcJsFile(wsStructureModel);
          break;
        default:
          throw new Error(
            `Not supported workspace structure entity!`
          );
      }
    });
  }

  private processRemoveFolder (
    wsStructureModel: WsStructureModel
  ): void {
    this.currentPath.push(wsStructureModel.value);
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    if (this.pathUtils.existPath(folderPath)) {
      this.folderUtils.removeFolder(folderPath);
    }
    this.processGenerateStructure(wsStructureModel.children);
    this.currentPath.pop();
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

  private processCreateRootJestConfigTsFile (
    wsStructureModel: WsStructureModel
  ): void {
    const jestConfigTsPath = this.pathUtils.createPath(
      ...this.currentPath, WorkspaceFileEnum.jestConfigTs
    );
    this.fileUtils.writeTextFile(
      jestConfigTsPath, this.buildJestConfigTs.build()
    );
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processCreateRepoxJsonFile (
    wsStructureModel: WsStructureModel
  ): void {
    const repoxJsonPath = this.pathUtils.createPath(
      ...this.currentPath, WorkspaceFileEnum.repoxJson
    );
    if (this.pathUtils.notExistPath(repoxJsonPath)) {
      this.fileUtils.writeJsonFile(
        repoxJsonPath, this.buildRepoxJson.build()
      );
    }
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

  private processExecCommand (
    wsStructureModel: WsStructureModel
  ): void {
    this.runCommandUtils.runCommand(wsStructureModel.value);
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processCreateEslintrcJsFile (
    wsStructureModel: WsStructureModel
  ): void {
    const eslintrcTsPath = this.pathUtils.createPath(
      ...this.currentPath, WorkspaceFileEnum.eslintrcFile
    );
    this.fileUtils.writeTextFile(
      eslintrcTsPath, this.buildEslintrcTs.build()
    );
    this.processGenerateStructure(wsStructureModel.children);
  }
}
