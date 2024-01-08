import {singleton} from "tsyringe";
import {WorkspaceContentBuilderModel} from "../../model/workspace/workspace-content-builder.model";
import {RepoxJsonDtoModel} from "../../model/dto/repox-json-dto.model";

@singleton()
/**
 * The service is responsible for building the repox.json content file.
 */
export class BuildRepoxJsonContentService implements WorkspaceContentBuilderModel {
    checkBeforeBuildContent(_path: string): boolean {
        return true;
    }

    buildContent(): string {
        const config: RepoxJsonDtoModel = {
            projects: {}
            // I am here
        };
        return JSON.stringify(config, null, 2);
    }
}

// todo: done