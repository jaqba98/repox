import { singleton } from "tsyringe";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { FileUtilsService } from "@lib/utils";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for parse alias to css.
 */
export class AliasToCssParserService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  parse(alias: string): string {
    const component = this.htmlProDomainStore.getComponent(alias);
    return component.styleUrls
      .map(styleUrl => this.fileUtils.readTextFile(styleUrl))
      .join(EMPTY_STRING);
  }
}
