import {singleton} from "tsyringe";

import {ParamDto} from "../domain/param-dto";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The store contains the param dto model.
 */
export class ParamDtoStore {
    private paramDto: ParamDto | undefined;

    get(): ParamDto {
        if (!this.paramDto) throw new Error("The store is not defined!");
        return this.paramDto;
    }

    set(paramDto: ParamDto): void {
        this.paramDto = deepCopy(paramDto);
    }
}
