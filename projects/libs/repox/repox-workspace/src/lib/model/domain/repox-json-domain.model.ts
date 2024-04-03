// done
/**
 * The model domain of repox configuration.
 */

export interface RepoxJsonDomainDefaultOptionsModel {
  packageManager: string
}

export interface RepoxJsonDomainProjectModel {
  name: string
  root: string
  src: string
  type: string
}

export interface RepoxJsonDomainModel {
  defaultOptions: RepoxJsonDomainDefaultOptionsModel
  projects: Record<string, RepoxJsonDomainProjectModel>
}
