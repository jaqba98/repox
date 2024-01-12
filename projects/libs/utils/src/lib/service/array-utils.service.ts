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

// todo: refactor the code
