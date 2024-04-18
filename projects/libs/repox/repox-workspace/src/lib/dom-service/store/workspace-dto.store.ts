// done
import { singleton } from "tsyringe";

import { type PartialPackageJsonDtoModel } from "../../model/dto/package-json-dto.model";
import { type PartialRepoxJsonDtoModel } from "../../model/dto/repox-json-dto.model";
import { type PartialTsconfigJsonDtoModel } from "../../model/dto/tsconfig-json-dto.model";

@singleton()
/**
 * The store of workspace dto model.
 */
export class WorkspaceDtoStore {
    workspacePackageJsonDto: PartialPackageJsonDtoModel | undefined;

    repoxJsonDto: PartialRepoxJsonDtoModel | undefined;

    tsconfigJsonDto: PartialTsconfigJsonDtoModel | undefined;

    getRepoxJsonDto (): PartialRepoxJsonDtoModel {
        if (this.repoxJsonDto === undefined) {
            throw new Error("The WorkspaceDtoStore.repoxJsonDto is undefined!");
        }
        return this.repoxJsonDto;
    }
}
