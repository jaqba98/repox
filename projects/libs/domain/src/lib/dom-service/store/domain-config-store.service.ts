import { singleton } from "tsyringe";
import { DomainConfigModel } from "../../model/domain-config.model";
import {
  PathUtilsService,
  ReadFileService,
  WriteFileService
} from "@lib/utils";
import { RepoxDomainModel } from "../../model/repox-domain.model";
import {
  TsconfigDomainModel
} from "../../model/tsconfig-domain.model";
import { ProjectDomainModel, ProjectTypeEnum } from "@lib/project";
import {
  DomainConfigFileEnum
} from "../../enum/domain-config-file.enum";
import { INDEX_TS_FILE, SRC_FOLDER } from "@lib/const";

@singleton()
/**
 * The store of domain configuration, which is used to read,
 * write and modify the domain configuration.
 */
export class DomainConfigStoreService {
  private config: DomainConfigModel | undefined;

  constructor(
    private readonly readFile: ReadFileService,
    private readonly writeFile: WriteFileService,
    private readonly pathUtils: PathUtilsService
  ) {
    this.config = undefined;
  }

  loadConfig(): void {
    this.config = {
      repoxDomain: this.readFile.readJson<RepoxDomainModel>(
        DomainConfigFileEnum.repoxJson
      ),
      tsconfigDomain: this.readFile.readJson<TsconfigDomainModel>(
        DomainConfigFileEnum.tsconfigJson
      )
    }
  }

  saveConfig(): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    this.writeFile.writeJson(
      DomainConfigFileEnum.repoxJson, this.config.repoxDomain
    );
    this.writeFile.writeJson(
      DomainConfigFileEnum.tsconfigJson, this.config.tsconfigDomain
    );
  }

  existProject(projectName: string): boolean {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    return Boolean(
      Object.values(this.config.repoxDomain.projects)
        .find(project => project.name === projectName)
    );
  }

  existAlias(projectAlias: string): boolean {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    return Boolean(
      this.config.tsconfigDomain.compilerOptions.paths[projectAlias]
    );
  }

  addProject(
    projectName: string,
    projectType: ProjectTypeEnum,
    projectPath: string
  ): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    this.config.repoxDomain.projects[projectName] = {
      name: projectName,
      type: projectType,
      path: projectPath,
      assets: []
    }
  }

  addAlias(alias: string, projectPath: string): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    const indexFile = this.pathUtils.createPath(
      [projectPath, SRC_FOLDER, INDEX_TS_FILE]
    );
    this.config
      .tsconfigDomain
      .compilerOptions
      .paths[alias] = [indexFile];
  }

  getProject(projectName: string): ProjectDomainModel {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    const project = Object.values(this.config.repoxDomain.projects)
      .find(project => project.name === projectName);
    if (project === undefined) {
      throw new Error("The project not exist!");
    }
    return project;
  }
}
