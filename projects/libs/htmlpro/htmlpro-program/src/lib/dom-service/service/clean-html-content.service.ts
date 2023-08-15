import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for clean html base content.
 */
export class CleanHtmlContentService {
  clean(htmlBaseContent: string): string {
    return htmlBaseContent
      .replaceAll(/\r\n/gm, ` `)
      .replaceAll(/\n/gm, ` `)
      .replaceAll(/<!--.*?-->/gm, ` `)
      .replaceAll(/\[\s+{/gm, `[{`)
      .replaceAll(/}\s+]/gm, `}]`)
      .replaceAll(/]\s+}/gm, `]}`)
      .replaceAll(/,\s+{/gm, `,{`)
      .replaceAll(/},\s+{/gm, `},{`)
      .replaceAll(/{\s+'/gm, `{'`)
      .replaceAll(/{\s+"/gm, `{"`)
      .replaceAll(/,\s+'/gm, `,'`)
      .replaceAll(/,\s+"/gm, `,"`)
      .replaceAll(/{\s+'/gm, `{'`)
      .replaceAll(/{\s+"/gm, `{"`)
      .replaceAll(/>\s+</gm, `><`)
      .replaceAll(/>\s+/gm, `>`)
      .replaceAll(/\s+</gm, `<`)
      .replaceAll(/"\s+/gm, `" `)
      .replaceAll(/'\s+/gm, `" `);
  }
}
