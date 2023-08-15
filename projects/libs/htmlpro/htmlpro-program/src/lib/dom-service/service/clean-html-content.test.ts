import { container } from "tsyringe";
import {
  CleanHtmlContentService
} from "./clean-html-content.service";

const htmlBaseContent: string = `
<!DOCTYPE html>
<html lang="en">
<head>
<title>Hello World</title>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>
`;

describe(`CleanHtmlContentService`, () => {
  const service = container.resolve(CleanHtmlContentService);

  test(`should correctly clean html file content`, () => {
    expect(service.clean(htmlBaseContent)).toBe(`<!DOCTYPE html><html lang="en"><head><title>Hello World</title></head><body><h1>Hello World</h1></body></html>`);
  });
});
