import { container } from "tsyringe";
import { HtmlConverterService } from "./html-converter.service";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlTypeEnum } from "../../enum/html-type.enum";

const htmlExample = `
<html lang="en">
<head>
<meta charset="utf-8">
<title>Example</title>
</head>
<body>
    <!-- Simple comment -->
    <h1>Hello Example</h1>
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
    <div>
        <img src="image1.png" alt="Image 1">
        <img src="image2.png" alt="Image 2">
<!--        <img src="image3.png" alt="Image 3">-->
    </div>
</body>
</html>
`;

describe(`HtmlConverterService`, () => {
  const service = container.resolve(HtmlConverterService);

  describe(`htmlToJson`, () => {
    test(`should be correct when correct html content`, () => {
      expect(service.htmlToJson(htmlExample)).toEqual<HtmlJsonModel[]>([
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
                  htmlBase: `<h1>`,
                  htmlType: HtmlTypeEnum.tagOpen,
                  htmlName: `h1`,
                  htmlAttributes: {},
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
});
