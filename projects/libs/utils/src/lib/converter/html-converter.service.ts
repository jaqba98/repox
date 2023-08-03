import { singleton } from "tsyringe";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for convert html to json and
 * json to html.
 */
export class HtmlConverterService {
  htmlToJson (html: string): any {
    const result = html
      .split(/>\s*</g)
      .filter(item => item !== EMPTY_STRING)
      .map(item => item.at(0) === "<" ? item : `<${item}`)
      .map(item => item.at(-1) === ">" ? item : `${item}>`)
      .map(item => ({ tagBase: item }))
      .map(item => ({
        ...item,
        tagType: this.getTagType(item.tagBase)
      }))
      .map(item => ({
        ...item,
        tagName: this.getTagName(item.tagBase)
      }))
      .map(item => ({
        ...item,
        attributes: this.getAttributes(item.tagBase)
      }));
    console.log(result);
  }

  private getTagType (htmlItem: string): "openTag" | "closeTag" {
    if (/<\/.*>/g.test(htmlItem)) return "closeTag";
    if (/<.*>/g.test(htmlItem)) return "openTag";
    throw new Error("Given item is not an html tag");
  }

  private getTagName (tagBase: string): string {
    const pattern = /<\/?(\w+)/g;
    const matches = tagBase.match(pattern);
    if (matches === null) {
      throw new Error("The given tag is not html!");
    }
    return matches.map((match) => match.replace(/[</>]/g, ""))[0];
  }

  private getAttributes (tagBase: string): any {
    const pattern = /(\S+)=([`'"])(.*?)\2/g;
    const attributes: Array<Record<string, string>> = [];
    let match;
    while ((match = pattern.exec(tagBase)) !== null) {
      const attribute = match[1];
      const value = match[3];
      attributes.push({ [attribute]: value });
    }
    return attributes;
  }
}
