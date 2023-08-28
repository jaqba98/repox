import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { FolderUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for creating the folder.
 */
export class CreateFolderAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly folderUtils: FolderUtilsService
  ) {
  }

  run (folderName: string): boolean {
    this.simpleMessage.writePlain(
      `Step: Create Folder >>> ${folderName}`
    );
    this.folderUtils.createFolder(folderName);
    return true;
  }
}
