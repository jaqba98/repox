import { container } from "tsyringe";
import { HtmlConverterService } from "./html-converter.service";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlTypeEnum } from "../../enum/html-type.enum";

const htmlExample = `
<html lang="en">
<head>
<title>Example</title>
</head>
<body></body>
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
              children: []
            }
          ]
        }
      ]);
    });
  });
});
