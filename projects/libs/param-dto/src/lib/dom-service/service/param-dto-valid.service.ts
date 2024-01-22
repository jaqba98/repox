import {singleton} from "tsyringe";

@singleton()
/**
 * The service is a recipe how to build param dto valid.
 */
export class ParamDtoValidService {
    supportedSigns: boolean = true;
    supportedSignsWrongIndexes: number[] = [];

    correctPattern: boolean = true;
    correctPatternWrongIndexes: number[] = [];

    canExist: boolean = true;
    canExistWrongIndexes: number[] = [];

    correctOrder: boolean = true;
    correctOrderWrongIndexes: number[] = [];
}
