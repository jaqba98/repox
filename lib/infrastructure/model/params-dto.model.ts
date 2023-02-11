import { ParamsTypeEnum } from "../enum/parameter-type.enum";

/**
 * Parameters transport model which is responsible for
 * store the parameters given from command line.
 */
export interface ParamsDtoModel {
  base: string;
  index: number;
  type: ParamsTypeEnum;
  belong: ParamsTypeEnum;
  hasValue: boolean;
  name: string;
  value: string;
}
