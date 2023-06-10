import { singleton } from "tsyringe";
import { DomainConfigModel } from "../../model/domain-config.model";
import { ReadFileService, WriteFileService } from "@lib/utils";
import { RepoxDomainModel } from "../../model/repox-domain.model";
import { DomainConfigFileEnum } from "@lib/domain";
import {
  TsconfigDomainModel
} from "../../model/tsconfig-domain.model";
import { ProjectDomainModel, ProjectTypeEnum } from "@lib/project";

@singleton()
/**
 * The store of domain configuration, which is used to read,
 * write and modify the domain configuration.
 */
export class DomainConfigStoreService {
  private config: DomainConfigModel | undefined;

  constructor(
    private readonly readFile: ReadFileService,
    private readonly writeFile: WriteFileService
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
      path: projectPath
    }
  }

  addAlias(alias: string, projectPath: string): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    this.config
      .tsconfigDomain
      .compilerOptions
      .paths[alias] = [projectPath];
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
