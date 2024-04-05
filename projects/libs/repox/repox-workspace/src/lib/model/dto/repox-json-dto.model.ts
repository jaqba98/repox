// done
import { type SystemProgramEnum } from '@lib/repox-program';

/**
 * The model dto represents a real content
 * of repox.json file.
 */

export interface RepoxJsonDtoDefaultOptionsModel {
  packageManager: SystemProgramEnum
}

export interface RepoxJsonDtoProjectModel {
  name: string
  root: string
  src: string
  type: 'app' | 'lib' | 'tool'
  // eslint-disable-next-line @typescript-eslint/ban-types
  targets: Record<string, {}>
}

export interface RepoxJsonDtoModel {
  defaultOptions: RepoxJsonDtoDefaultOptionsModel
  projects: Record<string, RepoxJsonDtoProjectModel>
}

export interface PartialRepoxJsonDtoModel extends Partial<RepoxJsonDtoModel> {}
