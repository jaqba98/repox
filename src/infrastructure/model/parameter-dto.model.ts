import { ParameterTypeEnum } from "../enum/parameter-type.enum";

/**
 * Parameter data transport model (DTO) for parameters directly
 * from the command line.
 */

interface ParameterDtoEntityModel {
  baseParameter: string;
  index: number;
  type: ParameterTypeEnum;
  hasValue: boolean;
  name: string;
  value: Array<string>;
}

export interface ParameterDtoModel {
  parameters: Array<ParameterDtoEntityModel>;
}
