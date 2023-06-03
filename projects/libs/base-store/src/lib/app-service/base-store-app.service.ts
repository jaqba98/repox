import { singleton } from "tsyringe";
import { BaseStoreService } from "../dom-service/base-store.service";

@singleton()
/**
 * The app service gives permission to use the base store
 * by other projects.
 */
export class BaseStoreAppService<TData>
  extends BaseStoreService<TData> {
}
