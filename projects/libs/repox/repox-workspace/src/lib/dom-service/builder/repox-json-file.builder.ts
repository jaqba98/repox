import {singleton} from "tsyringe";

import {WorkspaceStructureAbstractBuilder} from "./workspace-structure-abstract.builder";
import {writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {RepoxJsonDtoModel} from "../../model/dto/repox-json-dto.model";

@singleton()
/**
 * Create repox.json file.
 */
export class RepoxJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate() {
        writeJsonToFile<RepoxJsonDtoModel>(
            WorkspaceFileEnum.repoxJson,
            this.createRepoxJsonContent()
        );
    }

    regenerate() {
        writeJsonToFile<RepoxJsonDtoModel>(
            WorkspaceFileEnum.repoxJson,
            this.createRepoxJsonContent()
        );
    }

    private createRepoxJsonContent(): RepoxJsonDtoModel {
        return {
            projects: {}
        };
    }
}
