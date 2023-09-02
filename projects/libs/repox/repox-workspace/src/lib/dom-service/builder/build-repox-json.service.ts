import { singleton } from "tsyringe";
import {
  type WsRepoxDtoModel
} from "../../model/ws-dto/ws-repox-dto.model";

@singleton()
/**
 * The service is responsible for create repox.json
 * content.
 */
export class BuildRepoxJsonService {
  build (): WsRepoxDtoModel {
    return {
      projects: {}
    };
  }
}
