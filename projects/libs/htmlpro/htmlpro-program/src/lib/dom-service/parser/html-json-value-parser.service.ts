import { singleton } from "tsyringe";
import type {
  HtmlJsonAttributeModel,
  HtmlJsonModel
} from "../../model/html-json.model";

@singleton()
/**
 * The service is responsible for parse html json values.
 */
export class HtmlJsonValueParserService {
  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html, {}));
  }

  private parseChild(
    htmlJson: HtmlJsonModel, parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel {
    const newParentAttributes = {
      ...parentAttributes, ...htmlJson.htmlAttributes
    };
    const htmlJsonResult = this.parseValue(
      htmlJson, newParentAttributes
    );
    return {
      ...htmlJsonResult,
      children: htmlJsonResult.children
        .map(child => this.parseChild(child, newParentAttributes))
    };
  }

  private parseValue(
    htmlJson: HtmlJsonModel,
    parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel {
    for (const attribute in parentAttributes) {
      htmlJson.htmlAttributes[attribute] = parentAttributes[attribute];
    }
    return htmlJson;
  }
}
// todo: refactor the file
