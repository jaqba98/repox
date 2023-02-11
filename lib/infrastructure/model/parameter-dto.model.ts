import { ParameterTypeEnum } from "../enum/parameter-type.enum";

export interface ParameterDtoEntityModel {
  baseValue: string;
  index: number;
  type: ParameterTypeEnum;
  belong: ParameterTypeEnum.program | ParameterTypeEnum.command | "myself";
  hasValue: boolean;
  name: string;
  value: string;
}

export interface ParameterDtoModel {
  parameters: Array<ParameterDtoEntityModel>;
}
