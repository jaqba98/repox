import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";

@singleton()
/**
 * The service is responsible for parse html json imports.
 */
export class HtmlJsonAliasParserService {
  parse(htmlJson: HtmlJsonModel[]): string[] {
    return htmlJson
      .map(html => this.parseChild(html))
      .flat()
      .filter(html => html)
      .reduce((acc: string[], curr: string): string[] => {
        return acc.includes(curr) ? acc : [...acc, curr];
      }, []);
  }

  private parseChild(htmlJson: HtmlJsonModel): string[] {
    let aliases: string[] = [];
    const alias = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataImport
    ];
    aliases = [...aliases, alias];
    const children = htmlJson.children
      .map(child => this.parseChild(child))
      .flat();
    return [...aliases, ...children];
  }
}
