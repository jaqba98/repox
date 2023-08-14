import { singleton } from "tsyringe";
import { HtmlTypeEnum } from "../../enum/html-type.enum";
import {
  HtmlSelfCloseTagEnum
} from "../../enum/html-self-close-tag.enum";
import type {
  HtmlJsonModel
} from "../../model/html-json.model";

@singleton()
/**
 * The service is responsible for convert html to json.
 */
export class HtmlToJsonConverterService {
  htmlToJson(html: string): HtmlJsonModel[] {
    const json: HtmlJsonModel[] = html
      .replaceAll(/<!--[\s\S]*?-->/gm, ``)
      .split(/(?=<)|(?<=>)/)
      .map(htmlItem => htmlItem.trim())
      .filter(htmlItem => htmlItem !== ``)
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
      }));
    return this.createHierarchy(json);
  }

  getAttributes(
    tagBase: string
  ): HtmlJsonModel["htmlAttributes"] {
    const pattern = /[^<>\s]+="[^"]+"|[^<>\s]+='[^']+'|[^<>\s]+/gm;
    return tagBase.match(pattern) ?? [];
  }

  private getTagType(htmlBase: string): HtmlTypeEnum {
    if (/<\/.*>/g.test(htmlBase)) return HtmlTypeEnum.tagClose;
    if (/<.*>/g.test(htmlBase)) return HtmlTypeEnum.tagOpen;
    return HtmlTypeEnum.tagContent;
  }

  private getTagName(htmlBase: string, htmlType: HtmlTypeEnum): string {
    if (htmlType === HtmlTypeEnum.tagContent) return ``;
    return htmlBase
      .split(` `)[0]
      .trim()
      .replaceAll(/[</>]/g, ``)
      .toLowerCase();
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
      if (tag.htmlType === `tagContent`) {
        if (stack.length > 0) {
          const topTag = stack[stack.length - 1];
          topTag.children.push(tag);
        } else {
          result.push(tag);
        }
      } else if (tag.htmlType === `tagOpen`) {
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
      } else if (tag.htmlType === `tagClose`) {
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
      throw new Error(`Invalid HTML structure. Not all tags were closed properly.`);
    }
    return result;
  }
}
