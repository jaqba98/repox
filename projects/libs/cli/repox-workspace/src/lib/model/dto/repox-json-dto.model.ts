// done
import { type SystemProgramEnum } from "@lib/repox-program";

import { type ProjectTypeEnum } from "../../enum/project-type.enum";
import { type ExecutorEnum } from "../../enum/executor.enum";

/**
 * The model dto represents a real content
 * of repox.json file.
 */

export interface RepoxJsonDtoDefaultOptionsModel {
  packageManager: SystemProgramEnum
}

export interface RepoxJsonDtoTargetBuildTsModel {
  development: {
    tsconfig: string
  }
  production: {
    tsconfig: string
  }
}

export interface RepoxJsonDtoTargetModel extends RepoxJsonDtoTargetBuildTsModel {
  executor: ExecutorEnum
}

export interface RepoxJsonDtoProjectModel {
  name: string
  root: string
  src: string
  type: ProjectTypeEnum
  targets: Record<string, RepoxJsonDtoTargetModel>
}

export interface RepoxJsonDtoModel {
  defaultOptions: RepoxJsonDtoDefaultOptionsModel
  projects: Record<string, RepoxJsonDtoProjectModel>
}

export type PartialRepoxJsonDtoModel = Partial<RepoxJsonDtoModel>;
