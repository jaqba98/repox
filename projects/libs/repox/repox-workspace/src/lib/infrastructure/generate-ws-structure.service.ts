import { singleton } from "tsyringe";
import {
  BuildWsStructureService
} from "../dom-service/builder/build-ws-structure.service";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService,
  RunCommandUtilsService
} from "@lib/utils";
import {
  BuildRepoxJsonService
} from "../dom-service/builder/build-repox-json.service";
import {
  BuildTsconfigJsonService
} from "../dom-service/builder/build-tsconfig-json.service";
import {
  BuildGitignoreService
} from "../dom-service/builder/build-gitignore.service";
import {
  BuildJestConfigTsService
} from "../dom-service/builder/build-jest-config-ts.service";
import {
  BuildEslintrcJsService
} from "../dom-service/builder/build-eslintrc-js.service";
import {
  WsStructureModel
} from "../model/ws-structure/ws-structure.model";
import {
  WsStructureEnum
} from "../enum/ws-structure/ws-structure.enum";
import {
  WorkspaceFileEnum
} from "../enum/workspace/workspace-file.enum";
import { EMPTY_STRING } from "@lib/const";
import {
  WsRootPackageJsonDtoModel
} from "../model/ws-dto/ws-root-package-json-dto.model";
import {
  BuildRootPackageJsonService
} from "../dom-service/builder/build-root-package-json.service";

@singleton()
/**
 * The service is responsible for generate workspace structure
 * and then save it on the disc.
 */
export class GenerateWsStructureService {
  private currentPath: string[] = [];

  constructor(
    private readonly buildWsStructure: BuildWsStructureService,
    private readonly pathUtils: PathUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly folderUtils: FolderUtilsService,
    private readonly buildRepoxJson: BuildRepoxJsonService,
    private readonly buildTsconfigJson: BuildTsconfigJsonService,
    private readonly buildGitignore: BuildGitignoreService,
    private readonly buildJestConfigTs: BuildJestConfigTsService,
    private readonly runCommandUtils: RunCommandUtilsService,
    private readonly buildEslintrcTs: BuildEslintrcJsService,
    private readonly buildRootPackageJson: BuildRootPackageJsonService
  ) {
  }

  generateStructure(): void {
    this.currentPath = [];
    const wsStructureModels = this.buildWsStructure.buildStructure();
    this.processGenerateStructure(wsStructureModels);
  }

  private processGenerateStructure(
    wsStructureModels: WsStructureModel[]
  ): void {
    wsStructureModels.forEach(wsStructureModel => {
      switch (wsStructureModel.type) {
        case WsStructureEnum.createFolder:
          this.createFolder(wsStructureModel);
          break;
        case WsStructureEnum.createEmptyFileWhenFolderEmpty:
          this.createEmptyFileWhenFolderEmpty(wsStructureModel);
          break;
        case WsStructureEnum.createPackageJsonFile:
          this.createPackageJsonFile(wsStructureModel);
          break;
        case WsStructureEnum.runCommand:
          this.runCommand(wsStructureModel);
          break;
        // todo: I am here
        case WsStructureEnum.removeFolder:
          this.processRemoveFolder(wsStructureModel);
          break;
        case WsStructureEnum.removeFile:
          this.processRemoveFile(wsStructureModel);
          break;
        case WsStructureEnum.createGitignoreFile:
          this.processCreateGitignoreFile(wsStructureModel);
          break;
        case WsStructureEnum.createRootJestConfigTsFile:
          this.processCreateRootJestConfigTsFile(wsStructureModel);
          break;
        case WsStructureEnum.createRepoxJsonFile:
          this.processCreateRepoxJsonFile(wsStructureModel);
          break;
        case WsStructureEnum.createTsconfigJsonFile:
          this.processCreateTsconfigJsonFile(wsStructureModel);
          break;
        case WsStructureEnum.createEslintrcJsFile:
          this.processCreateEslintrcJsFile(wsStructureModel);
          break;
        default:
          throw new Error(
            `Not supported workspace structure entity!`
          );
      }
    });
  }

  private createFolder(
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

  private createEmptyFileWhenFolderEmpty(
    wsStructureModel: WsStructureModel
  ): void {
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    if (this.folderUtils.isEmpty(folderPath)) {
      const filePath = this.pathUtils.createPath(
        folderPath, wsStructureModel.value
      );
      this.fileUtils.writeTextFile(filePath, EMPTY_STRING);
    }
    this.processGenerateStructure(wsStructureModel.children);
  }

  private createPackageJsonFile(
    wsStructureModel: WsStructureModel
  ): void {
    const folderPath = this.pathUtils.createPath(...this.currentPath);
    const packageJsonPath = this.pathUtils.createPath(
      folderPath, WorkspaceFileEnum.packageJson
    );
    if (this.pathUtils.existPath(packageJsonPath)) {
      const packageJsonContent = this.fileUtils
        .readJsonFileWithoutError<WsRootPackageJsonDtoModel>(
          packageJsonPath
        );
      const packageJsonNewContent = this.buildRootPackageJson
        .rebuild(packageJsonContent);
      this.fileUtils.writeJsonFile(
        packageJsonPath, packageJsonNewContent
      );
    } else {
      const packageJsonNewContent = this.buildRootPackageJson
        .build();
      this.fileUtils.writeJsonFile(
        packageJsonPath, packageJsonNewContent
      );
    }
    this.processGenerateStructure(wsStructureModel.children);
  }

  private runCommand(
    wsStructureModel: WsStructureModel
  ): void {
    this.runCommandUtils.runCommand(wsStructureModel.value);
    this.processGenerateStructure(wsStructureModel.children);
  }

  private processRemoveFolder(
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

  private processRemoveFile(
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

  private processCreateGitignoreFile(
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

  private processCreateRootJestConfigTsFile(
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

  private processCreateRepoxJsonFile(
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

  private processCreateTsconfigJsonFile(
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

  private processCreateEslintrcJsFile(
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
