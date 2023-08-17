import { container } from "tsyringe";
import {
  HtmlToJsonConverterService
} from "./html-to-json-converter.service";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlTypeEnum } from "../../enum/html-type.enum";
import {
  CleanHtmlContentService
} from "../service/clean-html-content.service";

const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="script.js" defer></script>
<title>Example</title>
</head>
<body>
    <!-- Simple comment -->
    <h1 class='logo'>Hello Example</h1>
<!--    <div>-->
<!--        <p>Lorem ipsum 1</p>-->
<!--        <p>Lorem ipsum 2</p>-->
<!--        <p>Lorem ipsum 3</p>-->
<!--    </div>-->
<!--
    <div>
        <p>Lorem ipsum 1</p>
        <p>Lorem ipsum 2</p>
        <p>Lorem ipsum 3</p>
    </div>
-->
    <div data-items="[{'id':'1'},{'id':'2'},{'id':'3'}]"></div>
    <div>
        <img src="image1.png" alt="Image 1">
        <img src="image2.png" alt="Image 2">
<!--        <img src="image3.png" alt="Image 3">-->
    </div>
</body>
</html>
`;

describe(`HtmlToJsonConverterService`, () => {
  const cleanHtmlContent = container.resolve(CleanHtmlContentService);
  const service = container.resolve(HtmlToJsonConverterService);
  test(`should be correct when correct html content`, (): void => {
    const cleanedHtmlExample = cleanHtmlContent.clean(htmlExample);
    expect(service.parse(cleanedHtmlExample)).toEqual<HtmlJsonModel[]>([
      {
        htmlBase: `<!DOCTYPE html>`,
        htmlType: HtmlTypeEnum.tagOpen,
        htmlName: `!doctype`,
        htmlAttributes: {
          html: true
        },
        htmlSelfClose: true,
        children: []
      },
      {
        htmlBase: `<html lang="en">`,
        htmlType: HtmlTypeEnum.tagOpen,
        htmlName: `html`,
        htmlAttributes: {
          lang: `en`
        },
        htmlSelfClose: false,
        children: [
          {
            htmlBase: `<head>`,
            htmlType: HtmlTypeEnum.tagOpen,
            htmlName: `head`,
            htmlAttributes: {},
            htmlSelfClose: false,
            children: [
              {
                htmlBase: `<meta charset="utf-8">`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `meta`,
                htmlAttributes: {
                  charset: `utf-8`
                },
                htmlSelfClose: true,
                children: []
              },
              {
                htmlBase: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `meta`,
                htmlAttributes: {
                  name: `viewport`,
                  content: `width=device-width, initial-scale=1.0`
                },
                htmlSelfClose: true,
                children: []
              },
              {
                htmlBase: `<script src="script.js" defer>`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `script`,
                htmlAttributes: {
                  src: `script.js`,
                  defer: true
                },
                htmlSelfClose: false,
                children: []
              },
              {
                htmlBase: `<title>`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `title`,
                htmlAttributes: {},
                htmlSelfClose: false,
                children: [
                  {
                    htmlBase: `Example`,
                    htmlType: HtmlTypeEnum.tagContent,
                    htmlName: ``,
                    htmlAttributes: {},
                    htmlSelfClose: false,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            htmlBase: `<body>`,
            htmlType: HtmlTypeEnum.tagOpen,
            htmlName: `body`,
            htmlAttributes: {},
            htmlSelfClose: false,
            children: [
              {
                htmlBase: `<h1 class='logo'>`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `h1`,
                htmlAttributes: {
                  class: `logo`
                },
                htmlSelfClose: false,
                children: [
                  {
                    htmlBase: `Hello Example`,
                    htmlType: HtmlTypeEnum.tagContent,
                    htmlName: ``,
                    htmlAttributes: {},
                    htmlSelfClose: false,
                    children: []
                  }
                ]
              },
              {
                htmlBase: `<div data-items="[{'id':'1'},{'id':'2'},{'id':'3'}]">`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `div`,
                htmlAttributes: {
                  "data-items": `[{'id':'1'},{'id':'2'},{'id':'3'}]`
                },
                htmlSelfClose: false,
                children: []
              },
              {
                htmlBase: `<div>`,
                htmlType: HtmlTypeEnum.tagOpen,
                htmlName: `div`,
                htmlAttributes: {},
                htmlSelfClose: false,
                children: [
                  {
                    htmlBase: `<img src="image1.png" alt="Image 1">`,
                    htmlType: HtmlTypeEnum.tagOpen,
                    htmlName: `img`,
                    htmlAttributes: {
                      src: `image1.png`,
                      alt: `Image 1`
                    },
                    htmlSelfClose: true,
                    children: []
                  },
                  {
                    htmlBase: `<img src="image2.png" alt="Image 2">`,
                    htmlType: HtmlTypeEnum.tagOpen,
                    htmlName: `img`,
                    htmlAttributes: {
                      src: `image2.png`,
                      alt: `Image 2`
                    },
                    htmlSelfClose: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  });
});
