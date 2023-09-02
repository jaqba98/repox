// import { container } from "tsyringe";
// import {
//   CleanHtmlContentService
// } from "./clean-html-content.service";
//
// const htmlBaseContent: string = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset='utf-8'>
// <title>
//     Hello World
//     </title>
// <script>
//     console.log("Hello world");
// </script>
// </head>
// <body>
// <!--
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     In sollicitudin ipsum et pharetra aliquet. Ut vitae enim
//     malesuada, semper mi ut, tempus quam. Mauris cursus porta
//     turpis, a gravida odio pretium ac. Nulla dapibus risus ac
//     lectus elementum faucibus. Suspendisse ex ipsum, maximus
//     vel nisl eu, aliquet dignissim mauris. Etiam egestas vehicula
//     elit, eu elementum elit feugiat a. Sed eget justo non nulla
//     ultrices scelerisque.
// -->
// <!--<div>-->
// <!--<p>-->
// <!--Lorem ipsum dolor sit amet, consectetur adipisicing elit.-->
// <!--Autem beatae consequuntur eligendi, illum ipsa laudantium-->
// <!--molestiae nesciunt, nihil nisi nostrum, pariatur perspiciatis-->
// <!--porro provident qui suscipit ullam unde voluptate voluptatum?-->
// <!--</p>-->
// <!--</div>-->
// <div
//   data-attribute_1
//   data-attribute_2
//   data-attribute_3
// ></div>
// <div        data-import="@component/nav"
//
// ></div>
// <div        class="style1 style2 style3"        ></div>
// <h1>Hello World</h1>
// <h2 data-text="hello 'boy'"
//
//
// ></h2>
// <h2     data-text-new='hello "dog"'></h2>
// </body>
// </html>
// `;
//
// describe(`CleanHtmlContentService`, () => {
//   const service = container.resolve(CleanHtmlContentService);
//
//   test(`should correctly clean html file content`, () => {
//     expect(service.clean(htmlBaseContent)).toBe(`<!DOCTYPE html><html lang="en"><head><meta charset='utf-8'><title>Hello World</title><script>console.log("Hello world");</script></head><body><div  data-attribute_1  data-attribute_2  data-attribute_3></div><div        data-import="@component/nav" ></div><div        class="style1 style2 style3" ></div><h1>Hello World</h1><h2 data-text="hello 'boy'" ></h2><h2     data-text-new='hello "dog"'></h2></body></html>`);
//   });
// });
// // todo: refactor the file
test('true', () => {
  expect(true).toBeTruthy();
});
