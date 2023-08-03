import { singleton } from "tsyringe";
import { type HtmlProDomainModel } from "../model/html-pro-domain.model";

@singleton()
/**
 * The service is responsible for building default content
 * for all HtmlPro files.
 */
export class CreateHtmlProFileAppService {
  buildDefaultHtmlProContentFile (): HtmlProDomainModel {
    return {
      components: {}
    };
  }
}
