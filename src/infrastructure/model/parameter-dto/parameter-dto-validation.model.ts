import { ParameterDtoEntityModel } from "./parameter-dto.model";

/**
 * Parameter DTO model for validation.
 */

export interface ParameterDtoValidationEntityModel {
  entity: ParameterDtoEntityModel;
  error: boolean;
}

export interface ParameterDtoValidationModel {
  entities: Array<ParameterDtoValidationEntityModel>;
  message: string;
}

/**
 * Error: Incorrect command!
 *
 * repox wo/rks#pace generate
 *       ^^^^^^^^^^^
 *
 * Unsupported characters: / #
 */
