import { ParamTypeEnum } from "../enum/param-type.enum";

/**
 * Parameter DTO model (data transport model) for parameters
 * directly from the command line.
 */
export interface ParamDtoModel {
  params: Array<{
    baseValue: string;
    index: number;
    paramType: ParamTypeEnum;
    hasValue: boolean;
    paramName: string;
    paramValues: Array<string>;
  }>;
}

/**
 * The result model of the parameter DTO validation.
 * Example:
 * {
 *   isError: true;
 *   wrongParams: [0, 1];
 *   errors: ["Lorem ipsum error 1"],
 *   tips: ["Lorem ipsum tip 1"]
 * }
 * Result:
 * ERROR: Wrong command!
 * repox gen/erate works%pace
 *       ^^^^^^^^^ ^^^^^^^^^^
 * ERR: Lorem ipsum error 1
 * TIP: Lorem ipsum tip 1
 */
export interface ParamsDtoValidateModel {
  isError: boolean;
  wrongParams: Array<number>;
  errors: Array<string>;
  tips: Array<string>;
}
