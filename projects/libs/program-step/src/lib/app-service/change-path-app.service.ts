import {singleton} from "tsyringe";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {PathUtilsService} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for changing
 * the current path to the selected path.
 */
export class ChangePathAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (path: string): boolean {
    this.simpleMessage.writePlain(`Step: Change Path >>> ${path}`);
    if (this.pathUtils.existPath(path)) {
      this.pathUtils.changePath(path);
      return true;
    }
    this.newline.writeNewline();
    this.simpleMessage.writeError(`The path ${path} does not exist`);
    return false;
  }
}
