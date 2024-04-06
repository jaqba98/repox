// done
import { type SystemProgramEnum } from '@lib/repox-program';

import { type ProjectTypeEnum } from '../../enum/project-type.enum';

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

export interface RepoxJsonDtoTargetsModel {
  buildTs: RepoxJsonDtoTargetBuildTsModel
}

export interface RepoxJsonDtoProjectModel {
  name: string
  root: string
  src: string
  type: ProjectTypeEnum
  targets: Record<string, RepoxJsonDtoTargetsModel>
}

export interface RepoxJsonDtoModel {
  defaultOptions: RepoxJsonDtoDefaultOptionsModel
  projects: Record<string, RepoxJsonDtoProjectModel>
}

export interface PartialRepoxJsonDtoModel extends Partial<RepoxJsonDtoModel> {}
