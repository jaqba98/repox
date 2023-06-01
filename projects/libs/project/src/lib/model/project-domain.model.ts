import { ProjectTypeEnum } from "../enum/project-type.enum";

export interface ProjectDomainModel {
  name: string;
  type: ProjectTypeEnum;
  path: string;
}
// todo: refactor