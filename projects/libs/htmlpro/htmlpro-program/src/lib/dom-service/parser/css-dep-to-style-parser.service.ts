import { singleton } from "tsyringe";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { FileUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for parse css dep to css style.
 */
export class CssDepToStyleParserService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  parse(cssDep: string[]): string {
    return cssDep
      .map(alias => this.htmlProDomainStore.getComponent(alias))
      .map(component => this.fileUtils.readHtmlFile(
        component.templateUrl
      ))
      .join(``);
  }
}
