import { singleton } from "tsyringe";
import { TsconfigModel } from "../../model/config/tsconfig.model";
import { FileModel } from "../../model/file/file.model";
import { FileUtilsService } from "@lib/utils";
import { RepoxModel } from "../../model/config/repox.model";
import { ConfigFileEnum } from "../../enum/config/config-file.enum";
import { basename, extname } from "path";

@singleton()
/**
 * The store service is responsible for
 * store all configuration file content
 * directly from files.
 */
export class RepoxWorkspaceStoreService {
  private repox: RepoxModel | undefined;
  private tsconfig: TsconfigModel | undefined;
  private files: Array<FileModel>;

  constructor(private readonly file: FileUtilsService) {
    this.repox = undefined;
    this.tsconfig = undefined;
    this.files = [];
  }

  loadWorkspace(): void {
    this.repox = this.file.readJsonFile<RepoxModel>(
      ConfigFileEnum.repoxJsonFile
    );
    this.tsconfig = this.file.readJsonFile<TsconfigModel>(
      ConfigFileEnum.tsconfigJsonFile
    );
    this.files = Object.values(this.repox.projects).map(project => ({
      name: project.name,
      files: this.file.readProjectFiles(project.root).map(file => ({
        path: file,
        name: basename(file),
        extname: extname(file)
      }))
    }))
  }
}
// todo: refactor
