import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  HtmlProDomainStoreService,
  HtmlProFileEnum
} from "@lib/htmlpro-workspace";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for load HtmlPro domain model.
 */
export class LoadHtmlProDomainAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly htmlProDomainStore: HtmlProDomainStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load HTMLPRO domain model");
    // Check if workspace files exist
    if (this.pathUtils.notExistPath(HtmlProFileEnum.htmlProJson)) {
      this.simpleMessage.writeError("Incorrect workspace structure");
      this.simpleMessage.writeError(
        `The ${HtmlProFileEnum.htmlProJson} file does not exist`
      );
      return false;
    }
    // Load the workspace dto model
    this.htmlProDomainStore.loadHtmlProDomain();
    // Verification the workspace dto model
    const verifyHtmlProDomain = this.htmlProDomainStore
      .verifyHtmlProDomain();
    if (verifyHtmlProDomain.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${HtmlProFileEnum.htmlProJson} file`
      );
      verifyHtmlProDomain.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    return true;
  }
}
