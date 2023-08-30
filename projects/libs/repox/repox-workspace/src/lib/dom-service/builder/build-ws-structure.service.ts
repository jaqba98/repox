import { singleton } from "tsyringe";
import {
  type WsStructureModel
} from "../../model/ws-structure/ws-structure.model";
import {
  WsStructureEntityEnum
} from "../../enum/ws-structure/ws-structure-entity.enum";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
  buildStructure (): WsStructureModel[] {
    return [
      {
        type: WsStructureEntityEnum.createTsconfigJsonFile,
        value: EMPTY_STRING,
        children: []
      }
    ];
  }
}
