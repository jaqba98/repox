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
  toProjectType (_projectType: string): ProjectTypeEnum {
    return ProjectTypeEnum.appTs;
  }

  toWorkspaceFolder (
    _projectType: ProjectTypeEnum
  ): WorkspaceFolderEnum {
    return WorkspaceFolderEnum.apps;
  }
}
// todo: refactor the file
