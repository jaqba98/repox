import { singleton } from "tsyringe";
import {
  ParamDtoStoreService
} from "../dom-service/store/param-dto-store.service";

@singleton()
/**
 * The app service gives permission to use param dto base-store
 * from other projects.
 */
export class ParamDtoStoreAppService extends ParamDtoStoreService {
}
