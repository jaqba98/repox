import {singleton} from "tsyringe";
import {WorkspaceStructureModel} from "../../model/workspace/workspace-structure.model";

@singleton()
/**
 * The service is responsible for creating
 * workspace structure to generate.
 */
export class BuildWsStructureService {
    buildStructure(): WorkspaceStructureModel[] {
        return [];
    }
}
