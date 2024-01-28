import {injectable} from "tsyringe";

@injectable()
/**
 * The service is a recipe how to build param dto error.
 */
export class ParamDtoError {
    supportedSignsErrors: number[] = [];

    correctPatternErrors: number[] = [];

    canExistErrors: number[] = [];

    correctOrderErrors: number[] = [];
}
