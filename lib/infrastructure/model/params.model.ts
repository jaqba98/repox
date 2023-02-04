import { ArgTypeEnum } from "../enum/arg-type.enum";

/**
 * Parameter model used to store the data
 * (all arguments) given from the command line.
 */
export interface ParamsModel {
  base: string;
  index: number;
  type: ArgTypeEnum;
  hasValue: boolean;
  data: {
    name: string;
    value: string;
  };
}
