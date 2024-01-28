import {singleton} from "tsyringe";

@singleton()
/**
 * The service is responsible for checking the base value.
 */
export class CheckBaseValueService {
    checkBaseBaseValueSupportedSigns(baseValue: string): boolean {
        return /^[a-zA-Z0-9-]*$/gm.test(baseValue);
    }

    checkArgumentsBaseValueSupportedSigns(baseValue: string): boolean {
        return /^[a-zA-Z0-9-="'`,]*$/gm.test(baseValue);
    }

    checkBaseBaseValueCorrectPattern(baseValue: string): boolean {
        return /^[a-zA-Z][a-zA-Z0-9-]*$/gm.test(baseValue);
    }

    checkArgumentsBaseValueCorrectPattern(baseValue: string, hasValue: boolean, isAlias: boolean): boolean {
        if (!hasValue && !isAlias) {
            return /^--[a-zA-Z][a-zA-Z0-9-]*$/gm.test(baseValue);
        }
        if (!hasValue && isAlias) {
            return /^-[a-zA-Z]*$/gm.test(baseValue);
        }
        if (hasValue && !isAlias) {
            return /^--[a-zA-Z][a-zA-Z0-9-]*=[a-zA-Z"'`][a-zA-Z0-9-,]*[a-zA-Z"'`]/gm.test(baseValue);
        }
        return /^-[a-zA-Z]=[a-zA-Z"'`][a-zA-Z0-9-,]*[a-zA-Z"'`]/gm.test(baseValue);
    }
}
// todo: refactor the code