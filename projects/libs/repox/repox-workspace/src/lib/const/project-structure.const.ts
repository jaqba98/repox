import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {
    ProjectPackageJsonFileBuilder
} from "../dom-service/builder/project-package-json-file.builder";

/**
 * The contestant contains the whole project structure to generate.
 */
export const PROJECT_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: ".",
            builder: ProjectPackageJsonFileBuilder,
            children: []
        }
    ]
};
