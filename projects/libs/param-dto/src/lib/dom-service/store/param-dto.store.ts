import {singleton} from "tsyringe";

import {ParamDtoDomain} from "../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The store contains the param dto model.
 */
export class ParamDtoStore {
    private paramDto: ParamDtoDomain | undefined;

    get(): ParamDtoDomain {
        if (!this.paramDto) throw new Error("The store is not defined!");
        return this.paramDto;
    }

    set(paramDto: ParamDtoDomain): void {
        this.paramDto = deepCopy(paramDto);
    }
}
// todo: refactor the code