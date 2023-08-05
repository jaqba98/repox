import type { HtmlTypeEnum } from "../enum/html-type.enum";

/**
 * The model contains all fields after parse html to json.
 */
export interface HtmlJsonModel {
  children: HtmlJsonModel[];
  htmlAttributes: Array<Record<string, string>>;
  htmlName: string;
  htmlSelfClose: boolean;
  htmlType: HtmlTypeEnum;
  htmlBase: string;
}
