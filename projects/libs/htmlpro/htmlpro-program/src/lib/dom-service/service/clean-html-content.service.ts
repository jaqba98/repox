import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for clean html base content.
 */
export class CleanHtmlContentService {
  clean(htmlBaseContent: string): string {
    return htmlBaseContent
      .replaceAll(/\r\n/gm, EMPTY_STRING)
      .replaceAll(/\n/gm, EMPTY_STRING)
      .replaceAll(/<!--.*?-->/gm, EMPTY_STRING)
      .replaceAll(/\[\s+{/gm, `[{`)
      .replaceAll(/}\s+]/gm, `}]`)
      .replaceAll(/{\s+'/gm, `{'`)
      .replaceAll(/'\s+}/gm, `'}`)
      .replaceAll(/,\s+'/gm, `,'`)
      .replaceAll(/,\s+{/gm, `,{`);
  }
}
// todo: refactor the file
