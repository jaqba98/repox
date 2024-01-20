import {singleton} from "tsyringe";

@singleton()
/**
 * The service contains a group of utils to array.
 */
export class ArrayUtilsService {
    removeDuplicates<T>(arr: T[]): T[] {
        return arr.reduce((acc: T[], curr: T): T[] => {
            if (!acc.includes(curr)) {
                acc = [...acc, curr];
            }
            return acc;
        }, []);
    }
}

export const getIndexesBetween = (startIndex: number, endIndex: number): number[] => {
    const result = [];
    for (let i = (startIndex + 1); i < endIndex; i++) {
        result.push(i);
    }
    return result;
}

// todo: refactor the code
