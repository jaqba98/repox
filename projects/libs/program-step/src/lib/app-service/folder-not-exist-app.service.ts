import { singleton } from "tsyringe";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking whether
 * the folder name not exist.
 */
export class FolderNotExistAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (folderName: string): boolean {
    this.simpleMessage.writePlain(
      `Step: Folder Not Exist >>> ${folderName}`
    );
    if (this.pathUtils.notExistPath(folderName)) {
      return true;
    }
    this.newline.writeNewline();
    this.simpleMessage.writeError(
      `A ${folderName} folder exists in the current directory`
    );
    this.simpleMessage.writeWarning(
      `Specify a different workspace name and restart the program`
    );
    return false;
  }
}
