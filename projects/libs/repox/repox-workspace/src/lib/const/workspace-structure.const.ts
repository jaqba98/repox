import {WorkspaceStructureModel} from "../model/workspace/workspace-structure.model";
import {ProjectsFolderBuilder} from "../dom-service/builder/projects-folder.builder";
import {AppsFolderBuilder} from "../dom-service/builder/apps-folder.builder";
import {LibsFolderBuilder} from "../dom-service/builder/libs-folder.builder";
import {ToolsFolderBuilder} from "../dom-service/builder/tools-folder.builder";

/**
 * The contestant contains the whole workspace structure to generate.
 */
export const WORKSPACE_STRUCTURE: WorkspaceStructureModel = {
    structure: [
        {
            path: "projects",
            builder: ProjectsFolderBuilder,
            children: [
                {
                    path: "apps",
                    builder: AppsFolderBuilder,
                    children: []
                },
                {
                    path: "libs",
                    builder: LibsFolderBuilder,
                    children: []
                },
                {
                    path: "tools",
                    builder: ToolsFolderBuilder,
                    children: []
                }
            ]
        }
    ]
};
