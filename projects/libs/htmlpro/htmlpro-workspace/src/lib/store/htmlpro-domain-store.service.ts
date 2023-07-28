import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import { HtmlproDomainModel } from "../model/htmlpro-domain.model";
import { HtmlproFileEnum } from "../enum/htmlpro-file.enum";
import { Validator, ValidatorResult } from "jsonschema";
import { htmlProJsonFileSchema } from "../const/schema.const";

@singleton()
/**
 * The domain store service is responsible for store
 * domain htmlpro configuration.
 */
export class HtmlproDomainStoreService {
  private htmlproDomain: HtmlproDomainModel | undefined;

  constructor(
    private readonly fileUtils: FileUtilsService,
    private readonly validator: Validator
  ) {
  }

  loadHtmlproDomain(): void {
    this.htmlproDomain = this.fileUtils
      .readJsonFile<HtmlproDomainModel>(HtmlproFileEnum.htmlproJson);
  }

  verifyHtmlproDomain(): ValidatorResult {
    this.validator.addSchema(
      htmlProJsonFileSchema, "/HtmlProJsonFileSchema"
    );
    return this.validator.validate(
      this.htmlproDomain, htmlProJsonFileSchema
    );
  }

  getHtmlProDomain(): HtmlproDomainModel {
    if (this.htmlproDomain === undefined) {
      throw new Error("The store is undefined!");
    }
    return this.htmlproDomain;
  }
}
