import { singleton } from "tsyringe";
import { FileExistService } from "../infrastructure/file-exist.service";
import { DomainConfigFileEnum } from "@lib/domain";
import { SimpleMessageAppService } from "@lib/logger";

@singleton()
/**
 * The app service is responsible for check whether
 * to the folder is a workspace.
 */
export class FolderIsWorkspaceAppService {
  constructor(
    private readonly fileExist: FileExistService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  checkFolder(): boolean {
    this.simpleMessage.writePlain(
      "Check whether the current folder is the workspace", 0
    );
    if (!this.fileExist.exist(DomainConfigFileEnum.repoxJson)) {
      return false;
    }
    return this.fileExist.exist(DomainConfigFileEnum.tsconfigJson);
  }
}
