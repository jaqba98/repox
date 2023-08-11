import type { HtmlTypeEnum } from "../enum/html-type.enum";

/**
 * The model contains all fields after parse html to json.
 */

export interface HtmlJsonAttributeModel {
  [attribute: string]: string;
}

export interface HtmlJsonModel {
  children: HtmlJsonModel[];
  htmlAttributes: HtmlJsonAttributeModel;
  importHtmlAttributes: HtmlJsonAttributeModel;
  htmlName: string;
  htmlSelfClose: boolean;
  htmlType: HtmlTypeEnum;
  htmlBase: string;
}
