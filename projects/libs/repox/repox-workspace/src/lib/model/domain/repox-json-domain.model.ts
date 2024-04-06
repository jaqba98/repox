// done
import {
  type RepoxJsonDtoTargetBuildTsModel,
  type RepoxJsonDtoDefaultOptionsModel,
  type RepoxJsonDtoProjectModel
} from '../dto/repox-json-dto.model';

/**
 * The model domain of repox configuration.
 */

export interface RepoxJsonDomainDefaultOptionsModel extends RepoxJsonDtoDefaultOptionsModel {
}

export interface RepoxJsonDomainTargetBuildTsModel extends RepoxJsonDtoTargetBuildTsModel {
}

export interface RepoxJsonDomaimTargetsModel {
  buildTs: RepoxJsonDomainTargetBuildTsModel
}

export interface RepoxJsonDomainProjectModel extends Omit<RepoxJsonDtoProjectModel, 'targets'> {
  targets: Map<string, RepoxJsonDomaimTargetsModel>
}

export interface RepoxJsonDomainModel {
  defaultOptions: RepoxJsonDomainDefaultOptionsModel
  projects: Map<string, RepoxJsonDomainProjectModel>
}
