import { singleton } from "tsyringe";
import { DomainConfigModel } from "../../model/domain-model/domain-config.model";
import { FileUtilsService } from "@lib/utils";
import {
  DomainConfigFileEnum
} from "../../enum/domain-config-file.enum";
import {
  BuildProjectSchemeAppService
} from "../../app-service/build-project-scheme-app.service";
import { ProjectTypeEnum } from "../../enum/project-type.enum";
import { ProjectSchemeEnum } from "../../enum/project-scheme.enum";
import { RepoxDtoModel } from "../../model/dto-model/repox-dto.model";
import {
  TsconfigDtoModel
} from "../../model/dto-model/tsconfig-dto.model";

@singleton()
/**
 * The store of domain configuration, which is used to read,
 * write and modify the domain configuration.
 */
export class DomainConfigStoreService {
  private config: any | undefined;

  constructor(
    private readonly readFile: FileUtilsService,
    private readonly writeFile: FileUtilsService,
    private readonly buildProjectScheme: BuildProjectSchemeAppService
  ) {
    this.config = undefined;
  }

  loadConfig(): void {
    this.config = {
      repoxDomain: this.readFile.readJsonFile<RepoxDtoModel>(
        DomainConfigFileEnum.repoxJson
      ),
      tsconfigDomain: this.readFile.readJsonFile<TsconfigDtoModel>(
        DomainConfigFileEnum.tsconfigJson
      )
    }
  }

  saveConfig(): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    this.writeFile.writeJsonFile(
      DomainConfigFileEnum.repoxJson, this.config.repoxDomain
    );
    this.writeFile.writeJsonFile(
      DomainConfigFileEnum.tsconfigJson, this.config.tsconfigDomain
    );
  }

  existProject(projectName: string): boolean {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    return Boolean(
      Object.values(this.config.repoxDomain.projects)
        .find((project: any) => project.name === projectName)
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
    projectPath: string,
    scheme: ProjectSchemeEnum
  ): void {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    const projectScheme = this.buildProjectScheme.buildScheme(scheme);
    this.config.repoxDomain.projects[projectName] = {
      name: projectName,
      type: projectType,
      path: projectPath,
      scheme: projectScheme
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

  getProject(projectName: string): any {
    if (this.config === undefined) {
      throw new Error("The domain config store is undefined!");
    }
    const project = Object.values(this.config.repoxDomain.projects)
      .find((project: any) => project.name === projectName);
    if (project === undefined) {
      throw new Error("The project not exist!");
    }
    return project;
  }
}

// todo: refactor
