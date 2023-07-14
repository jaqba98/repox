import { singleton } from "tsyringe";
import {
  WsRepoxDtoModel
} from "../../model/ws-file-dto/ws-repox-dto.model";
import {
  WsTsconfigDtoModel
} from "../../model/ws-file-dto/ws-tsconfig-dto.model";
import {
  WsFileDtoModel
} from "../../model/ws-file-dto/ws-file-dto.model";
import { FileUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
  private wsRepoxDto: WsRepoxDtoModel | undefined;
  private wsTsconfigDto: WsTsconfigDtoModel | undefined;
  private wsFileDto: Array<WsFileDtoModel> | undefined;

  constructor(private readonly file: FileUtilsService) {
  }

  loadWsDto(): void {
    this.wsRepoxDto = this.file.readJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJsonFile
    );
    this.wsTsconfigDto = this.file.readJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJsonFile
    );
    this.wsFileDto = Object.values(this.wsRepoxDto.projects)
      .filter(project => project && project.name && project.root)
      .map(project => ({
        projectName: project.name,
        projectFiles: this.file.readProjectFiles(project.root)
          .map(file => ({
            filePath: file,
            fileName: this.file.getFileName(file),
            fileExtname: this.file.getFileExtname(file)
          }))
      }));
  }
}
