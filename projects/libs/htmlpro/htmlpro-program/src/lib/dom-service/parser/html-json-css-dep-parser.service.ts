import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";

@singleton()
/**
 * The service is responsible for parse html json to css dependencies.
 */
export class HtmlJsonCssDepParserService {
  parse(htmlJson: HtmlJsonModel[]): string[] {
    return htmlJson
      .map(html => this.parseChild(html))
      .flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): string[] {
    let cssDependencies: string[] = [];
    const alias = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataImport
      ];
    if (alias !== undefined) {
      cssDependencies.push(alias);
      return cssDependencies;
    }
    htmlJson.children
      .map(child => this.parseChild(child))
      .forEach(child => {
        cssDependencies = [...cssDependencies, ...child];
      });
    cssDependencies.push();
    return cssDependencies;
  }
}
