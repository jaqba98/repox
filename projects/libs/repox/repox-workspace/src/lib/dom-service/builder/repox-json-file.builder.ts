import { singleton } from "tsyringe";

import { SystemProgramEnum } from "@lib/repox-program";
import { writeJsonToFile } from "@lib/utils";

import { WorkspaceStructureAbstractBuilder } from "./workspace-structure-abstract.builder";
import { RepoxJsonDtoModel } from "../../model/dto/repox-json-dto.model";
import { WorkspaceFileEnum } from "../../enum/workspace-file.enum";

@singleton()
/**
 * Create repox.json file.
 */
export class RepoxJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
    generate (): void {
        writeJsonToFile(WorkspaceFileEnum.repoxJson, this.buildRepoxJson());
    }

    regenerate (): void {}

    private buildRepoxJson (): RepoxJsonDtoModel {
        return {
            defaultOptions: {
                packageManager: SystemProgramEnum.pnpm
            },
            projects: {}
        };
    }
}
