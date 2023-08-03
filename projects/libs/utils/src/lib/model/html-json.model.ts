/**
 * The model contains all fields after parse html to json.
 */
export interface HtmlJsonModel {
  children: HtmlJsonModel[];
  attributes: any;
  tagName: string;
  tagType: "openTag" | "closeTag";
  tagBase: string;
}
