import { singleton } from "tsyringe";
import { EMPTY_STRING, SPACE } from "@lib/const";
import type { HtmlJsonModel } from "../model/html-json.model";
import { HtmlTypeEnum } from "../enum/html-type.enum";
import {
  HtmlSelfCloseTagEnum
} from "../enum/html-self-close-tag.enum";

@singleton()
/**
 * The service is responsible for convert html to json and
 * json to html.
 */
export class HtmlConverterService {
  htmlToJson(html: string): HtmlJsonModel[] {
    const json: HtmlJsonModel[] = html
      .split(/(?=<)|(?<=>)/)
      .map(htmlItem => htmlItem.trim())
      .filter(htmlItem => htmlItem !== EMPTY_STRING)
      .map(htmlItem => ({ htmlBase: htmlItem }))
      .map(htmlItem => ({
        ...htmlItem, htmlType: this.getTagType(htmlItem.htmlBase)
      }))
      .map(htmlItem => ({
        ...htmlItem,
        htmlName: this.getTagName(htmlItem.htmlBase, htmlItem.htmlType)
      }))
      .map(htmlItem => ({
        ...htmlItem,
        htmlSelfClose: this.getSelfClose(
          htmlItem.htmlBase, htmlItem.htmlName
        )
      }))
      .map(htmlItem => ({
        ...htmlItem,
        htmlAttributes: this.getAttributes(htmlItem.htmlBase)
      }))
      .map(htmlItem => ({
        ...htmlItem,
        children: []
      }))
      .filter(htmlItem => htmlItem.htmlType !== HtmlTypeEnum.tagComment);
    return this.createHierarchy(json);
  }

  jsonToHtml(htmlJson: HtmlJsonModel[]): string {
    return htmlJson
      .map(json => this.buildHtmlContent(json))
      .join(EMPTY_STRING);
  }

  private buildHtmlContent(json: HtmlJsonModel): string {
    if (json.htmlType === HtmlTypeEnum.tagContent) {
      return json.htmlBase;
    }
    let htmlContent: string = EMPTY_STRING;
    // Build open tag
    htmlContent += `<${json.htmlName}`;
    json.htmlAttributes.forEach((attr): void => {
      const [key, value] = Object.entries(attr)[0];
      htmlContent += ` ${key}="${value}"`;
    });
    htmlContent += ">";
    // Build content
    json.children.forEach(child => {
      htmlContent += this.buildHtmlContent(child);
    });
    // Build close tag
    if (!json.htmlSelfClose) {
      htmlContent += `</${json.htmlName}>`;
    }
    return htmlContent;
  }

  private getTagType(htmlBase: string): HtmlTypeEnum {
    if (/<!--.*-->/g.test(htmlBase)) return HtmlTypeEnum.tagComment;
    if (/<\/.*>/g.test(htmlBase)) return HtmlTypeEnum.tagClose;
    if (/<.*>/g.test(htmlBase)) return HtmlTypeEnum.tagOpen;
    return HtmlTypeEnum.tagContent;
  }

  private getTagName(htmlBase: string, htmlType: HtmlTypeEnum): string {
    if (htmlType === HtmlTypeEnum.tagContent) return EMPTY_STRING;
    if (htmlType === HtmlTypeEnum.tagComment) return EMPTY_STRING;
    return htmlBase
      .split(SPACE)[0]
      .trim()
      .replaceAll(/[</>]/g, EMPTY_STRING);
  }

  private getAttributes(
    tagBase: string
  ): HtmlJsonModel["htmlAttributes"] {
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

  private getSelfClose(htmlBase: string, htmlName: string): boolean {
    if (Object.values(HtmlSelfCloseTagEnum).includes(
      htmlName as HtmlSelfCloseTagEnum
    )) {
      return true;
    }
    return /<.*\/>/g.test(htmlBase);
  }

  private createHierarchy(tags: HtmlJsonModel[]): HtmlJsonModel[] {
    const stack: HtmlJsonModel[] = [];
    const result: HtmlJsonModel[] = [];
    for (const tag of tags) {
      if (tag.htmlType === "tagContent") {
        if (stack.length > 0) {
          const topTag = stack[stack.length - 1];
          topTag.children.push(tag);
        } else {
          result.push(tag);
        }
      } else if (tag.htmlType === "tagOpen") {
        tag.children = [];
        if (stack.length > 0) {
          const topTag = stack[stack.length - 1];
          topTag.children.push(tag);
        } else {
          result.push(tag);
        }

        if (!tag.htmlSelfClose) {
          stack.push(tag);
        }
      } else if (tag.htmlType === "tagClose") {
        if (stack.length === 0) {
          throw new Error(`Invalid HTML structure. Found closing tag "${tag.htmlName}" without matching opening tag.`);
        }
        const closedTagName = tag.htmlName;
        let found = false;
        while (stack.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const currentTag = stack.pop()!;
          if (currentTag.htmlName === closedTagName) {
            found = true;
            break;
          }
        }
        if (!found) {
          throw new Error(`Invalid HTML structure. Expected closing tag for "${closedTagName}" but not found.`);
        }
      }
    }
    if (stack.length > 0) {
      throw new Error("Invalid HTML structure. Not all tags were closed properly.");
    }
    return result;
  }
}