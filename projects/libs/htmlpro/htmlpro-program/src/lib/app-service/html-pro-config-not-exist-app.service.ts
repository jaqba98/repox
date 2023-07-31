import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { HtmlProFileEnum } from "@lib/htmlpro-workspace";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for check whether HtmlPro
 * is not exist.
 */
export class HtmlProConfigNotExistAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(isForce: boolean): boolean {
    this.simpleMessage.writePlain(
      `Checking if HTMLPRO config file exist`
    );
    if (this.pathUtils.notExistPath(HtmlProFileEnum.htmlProJson)) {
      return true;
    }
    if (isForce) {
      return true;
    }
    this.simpleMessage.writeError(
      "HTMLPRO configuration already exist"
    );
    this.simpleMessage.writeWarning(
      "Use flag --force to generate configuration again"
    );
    return false;
  }
}
