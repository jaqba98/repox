import {
  type WsStructureEnum
} from "../../enum/ws-structure/ws-structure.enum";

/**
 * The model of workspace structure is responsible for define
 * each element of the workspace.
 */

export interface WsStructureModel {
  type: WsStructureEnum;
  value: string;
  children: WsStructureModel[];
}
