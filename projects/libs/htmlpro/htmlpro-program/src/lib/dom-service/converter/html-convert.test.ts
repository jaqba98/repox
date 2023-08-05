import { container } from "tsyringe";
import { HtmlConverterService } from "./html-converter.service";

const htmlExample = `
<html lang="en">
<head>
<title>Example</title>
</head>
<body></body>
</html>
`;

describe("HtmlConverterService", () => {
  const service = container.resolve(HtmlConverterService);

  describe("htmlToJson", () => {
    test("should be correct when correct html content", () => {
      expect(service.htmlToJson(htmlExample)).toEqual({});
    });
  });
});
