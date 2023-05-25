import { ArgumentEnum } from "../../enum/argument.enum";

/**
 * List of models for programs arguments.
 */

export interface DefaultDefaultProgramArgsModel {
  [ArgumentEnum.version]: boolean;
}

export interface ProgramArgModel
  extends DefaultDefaultProgramArgsModel {
}
