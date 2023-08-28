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

  run (workspaceName: string): boolean {
    this.simpleMessage.writePlain(
      `Step: Folder Not Exist >>> ${workspaceName}`
    );
    if (this.pathUtils.notExistPath(workspaceName)) {
      return true;
    }
    this.newline.writeNewline();
    this.simpleMessage.writeError(
      `A ${workspaceName} folder exists in the current directory`
    );
    this.simpleMessage.writeWarning(
      `Specify a different workspace name and restart the program`
    );
    return false;
  }
}
