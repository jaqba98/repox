import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  HtmlproDomainStoreService,
  HtmlproFileEnum
} from "@lib/htmlpro-workspace";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for load htmlpro domain model.
 */
export class LoadHtmlproDomainAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly htmlproDomainStore: HtmlproDomainStoreService
  ) {
  }

  run(): boolean {
    this.simpleMessage.writePlain("Load HTMLPRO domain model");
    // Check if workspace files exist
    if (this.pathUtils.notExistPath(HtmlproFileEnum.htmlproJson)) {
      this.simpleMessage.writeError("Incorrect workspace structure");
      this.simpleMessage.writeError(
        `The ${HtmlproFileEnum.htmlproJson} file does not exist`
      );
      return false;
    }
    // Load the workspace dto model
    this.htmlproDomainStore.loadHtmlproDomain();
    // Verification the workspace dto model
    const verifyHtmlproDomain = this.htmlproDomainStore
      .verifyHtmlproDomain();
    if (verifyHtmlproDomain.errors.length > 0) {
      this.simpleMessage.writeError(
        `Incorrect content of ${HtmlproFileEnum.htmlproJson} file`
      );
      verifyHtmlproDomain.errors.forEach(error => {
        this.simpleMessage.writeError(error.toString());
      });
      return false;
    }
    return true;
  }
}
