// done
/**
 * The model dto represents a real content
 * of repox.json file.
 */

export interface RepoxJsonDtoDefaultOptionsModel {
  packageManager: string
}

export interface RepoxJsonDtoProjectModel {
  name: string
  root: string
  src: string
  type: string
}

export interface RepoxJsonDtoModel {
  defaultOptions: RepoxJsonDtoDefaultOptionsModel
  projects: Record<string, RepoxJsonDtoProjectModel>
}

export interface PartialRepoxJsonDtoModel extends Partial<RepoxJsonDtoModel> {}
