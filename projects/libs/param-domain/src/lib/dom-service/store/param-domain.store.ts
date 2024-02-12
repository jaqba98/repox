import {singleton} from "tsyringe";

import {ParamDomain} from "../domain/param-domain";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The store contains the param domain model.
 */
export class ParamDomainStore {
    private paramDomain: ParamDomain | undefined;

    get(): ParamDomain {
        if (!this.paramDomain) {
            throw new Error("The param domain store does not exist!");
        }
        return this.paramDomain;
    }

    set(paramDomain: ParamDomain): void {
        this.paramDomain = deepCopy(paramDomain);
    }
}
