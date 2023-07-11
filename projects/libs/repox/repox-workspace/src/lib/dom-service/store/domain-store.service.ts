import { singleton } from "tsyringe";
import { DomainModel } from "../../model/domain.model";
import { FileModel } from "../../model/file.model";
import { FileUtilsService } from "@lib/utils";
import { ConfigFileEnum } from "../../enum/config/config-file.enum";
import { TsconfigModel } from "../../model/config/tsconfig.model";

@singleton()
/**
 * The store service is responsible for
 * store all configuration file content
 * directly from files.
 */
export class DomainStoreService {
  private domain: DomainModel | undefined;
  private tsconfig: TsconfigModel | undefined;
  private file: Array<FileModel> | undefined;

  constructor(private readonly fileUtils: FileUtilsService) {
    this.domain = undefined;
    this.tsconfig = undefined;
    this.file = undefined;
  }

  loadDomain(): void {
    // Read domain configuration file
    this.domain = this.fileUtils.readJsonFile<DomainModel>(
      ConfigFileEnum.repoxJsonFile
    );
    // Read tsconfig configuration file
    this.tsconfig = this.fileUtils.readJsonFile<TsconfigModel>(
      ConfigFileEnum.tsconfigJsonFile
    );
    // Read all files for all projects
    this.file = Object.values(this.domain.projects)
      .map(project => ({
        projectName: project.name,
        projectFiles: this.fileUtils.readProjectFiles(project.root)
          .map(file => ({
            filePath: file,
            fileName: this.fileUtils.getFileName(file),
            fileExtname: this.fileUtils.getFileExtname(file)
          }))
      }));
  }
}
// todo: refactor
