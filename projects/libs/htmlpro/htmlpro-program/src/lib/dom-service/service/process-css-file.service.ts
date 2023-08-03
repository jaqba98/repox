import { singleton } from "tsyringe";
import { NEW_LINE } from "@lib/const";
import { FileUtilsService } from "@lib/utils";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";

@singleton()
/**
 * The service is responsible for process css file.
 */
export class ProcessCssFileService {
  constructor (
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  process (alias: string): string {
    const component = this.htmlProDomainStore.getComponent(alias);
    return component.styleUrls
      .map(styleUrl => this.fileUtils.readTextFile(styleUrl))
      .join(NEW_LINE);
  }
}
