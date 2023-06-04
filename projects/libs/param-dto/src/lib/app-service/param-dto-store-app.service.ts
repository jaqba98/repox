import { singleton } from "tsyringe";
import { ParamDtoModel } from "@lib/param-dto";
import { BaseStoreService } from "@lib/core";

@singleton()
/**
 * The app service gives permission to use param dto base-base-store
 * from other projects.
 */
export class ParamDtoStoreAppService
  extends BaseStoreService<ParamDtoModel> {
}
