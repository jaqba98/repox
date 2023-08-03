import { singleton } from "tsyringe";
import {
  ProjectTypeEnum,
  WorkspaceFolderEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for convert string to project type.
 */
export class ConvertProjectTypeService {
  toProjectType (projectType: string): ProjectTypeEnum {
    switch (projectType) {
      case "app":
        return ProjectTypeEnum.app;
      case "lib":
        return ProjectTypeEnum.lib;
      case "tool":
        return ProjectTypeEnum.tool;
      default:
        throw new Error("Failed to convert the project type!");
    }
  }

  toWorkspaceFolder (
    projectType: ProjectTypeEnum
  ): WorkspaceFolderEnum {
    switch (projectType) {
      case ProjectTypeEnum.app:
        return WorkspaceFolderEnum.apps;
      case ProjectTypeEnum.lib:
        return WorkspaceFolderEnum.libs;
      case ProjectTypeEnum.tool:
        return WorkspaceFolderEnum.tools;
      default:
        throw new Error("Failed to convert the project type!");
    }
  }
}
