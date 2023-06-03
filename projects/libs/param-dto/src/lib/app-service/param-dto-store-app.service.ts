import { singleton } from "tsyringe";
import { BaseStoreAppService } from "@lib/base-store";
import { ParamDtoModel } from "@lib/param-dto";

@singleton()
/**
 * The app service gives permission to use param dto base-store
 * from other projects.
 */
export class ParamDtoStoreAppService
  extends BaseStoreAppService<ParamDtoModel> {
}
