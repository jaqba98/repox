// done
import { type SystemProgramEnum } from '@lib/repox-program';

import { type ProjectTypeEnum } from '../../enum/project-type.enum';

/**
 * The model domain of repox configuration.
 */

export interface RepoxJsonDomainDefaultOptionsModel {
  packageManager: SystemProgramEnum
}

export interface RepoxJsonDomainProjectModel {
  name: string
  root: string
  src: string
  type: ProjectTypeEnum
  // eslint-disable-next-line @typescript-eslint/ban-types
  targets: Record<string, {}>
}

export interface RepoxJsonDomainModel {
  defaultOptions: RepoxJsonDomainDefaultOptionsModel
  projects: Record<string, RepoxJsonDomainProjectModel>
}
