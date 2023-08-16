import { singleton } from "tsyringe";
import * as htmlMinifier from "html-minifier";

@singleton()
/**
 * The service is responsible for clean html base content.
 */
export class CleanHtmlContentService {
  clean(htmlBaseContent: string): string {
    return htmlMinifier.minify(htmlBaseContent, {
      collapseWhitespace: true,
      removeComments: true
    });
  }
}
