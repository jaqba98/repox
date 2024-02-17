import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {TsconfigJsonDtoPartialModel} from "../../model/dto/tsconfig-json-dto.model";

@singleton()
/**
 * Create tsconfig.json file.
 */
export class TsconfigJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeJsonToFile<TsconfigJsonDtoPartialModel>(WorkspaceFileEnum.tsconfigJson, {});
    }
}
