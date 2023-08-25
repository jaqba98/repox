import { container } from "tsyringe";
import { HtmlTypeEnum } from "../../enum/html-type.enum";
import type { HtmlJsonModel } from "../../model/html-json.model";
import {
  JsonToHtmlConverterService
} from "./json-to-html-converter.service";

const jsonExample: HtmlJsonModel[] = [
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
];

describe(`JsonToHtmlConverterService`, () => {
  const service = container.resolve(JsonToHtmlConverterService);
  test(`should be correct when correct json content`, () => {
    expect(service.parse(jsonExample)).toEqual<string>(`<html lang="en"><head><meta charset="utf-8"><script src="script.js" defer></script><title>Example</title></head><body><h1>Hello Example</h1><div><img src="image1.png" alt="Image 1"><img src="image2.png" alt="Image 2"></div></body></html>`);
  });
});
// todo: refactor the file
