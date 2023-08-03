import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import {
  type HtmlProDomainModel,
  type HtmProComponentDomainModel
} from "../model/html-pro-domain.model";
import { HtmlProFileEnum } from "../enum/html-pro-file.enum";
import { Validator, type ValidatorResult } from "jsonschema";
import { htmlProJsonFileSchema } from "../const/schema.const";

@singleton()
/**
 * The domain store service is responsible for store
 * domain HtmlPro configuration.
 */
export class HtmlProDomainStoreService {
  private htmlProDomain: HtmlProDomainModel | undefined;

  constructor (
    private readonly fileUtils: FileUtilsService,
    private readonly validator: Validator
  ) {
  }

  loadHtmlProDomain (): void {
    this.htmlProDomain = this.fileUtils
      .readJsonFile<HtmlProDomainModel>(HtmlProFileEnum.htmlProJson);
  }

  verifyHtmlProDomain (): ValidatorResult {
    this.validator.addSchema(
      htmlProJsonFileSchema, "/HtmlProJsonFileSchema"
    );
    return this.validator.validate(
      this.htmlProDomain, htmlProJsonFileSchema
    );
  }

  getHtmlProDomain (): HtmlProDomainModel {
    if (this.htmlProDomain === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.htmlProDomain;
  }

  getComponent (componentAlias: string): HtmProComponentDomainModel {
    const comp = Object.values(this.getHtmlProDomain().components)
      .find(component => component.alias === componentAlias);
    if (comp === undefined) {
      throw new Error(`Not found ${componentAlias} component`);
    }
    return comp;
  }
}
