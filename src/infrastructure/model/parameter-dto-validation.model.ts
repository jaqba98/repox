/**
 * The model of parameter dto for validation.
 *
 * Example:
 * {
 *   error: true;
 *   wrongIndexes: [0, 1];
 *   errors: ["Lorem ipsum error 1"],
 *   tips: ["Lorem ipsum tip 1"]
 * }
 *
 * Result:
 * Error: Wrong command!
 *
 * repox gen/erate works%pace
 *       ^^^^^^^^^ ^^^^^^^^^^
 *
 * ERR: Lorem ipsum error 1
 *
 * TIP: Lorem ipsum tip 1
 */
export interface ParameterDtoValidationModel {
  error: boolean;
  wrongIndexes: Array<number>;
  errors: Array<string>;
  tips: Array<string>;
}
