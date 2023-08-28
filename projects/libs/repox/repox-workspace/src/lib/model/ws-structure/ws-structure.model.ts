import {
  type WsStructureEntityEnum
} from "../../enum/ws-structure/ws-structure-entity.enum";

/**
 * The model of workspace structure is responsible for define
 * each element of the workspace.
 */

export interface WsStructureModel {
  type: WsStructureEntityEnum;
  value: string;
  children: WsStructureModel[];
}
