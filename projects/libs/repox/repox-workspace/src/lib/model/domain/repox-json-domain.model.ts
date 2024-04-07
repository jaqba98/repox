// done
import {
  type RepoxJsonDtoDefaultOptionsModel,
  type RepoxJsonDtoProjectModel
} from '../dto/repox-json-dto.model';

/**
 * The model domain of repox configuration.
 */

export interface RepoxJsonDomainDefaultOptionsModel extends RepoxJsonDtoDefaultOptionsModel {
}

export interface RepoxJsonDomainProjectModel extends RepoxJsonDtoProjectModel {
}

export interface RepoxJsonDomainModel {
  defaultOptions: RepoxJsonDomainDefaultOptionsModel
  projects: Record<string, RepoxJsonDomainProjectModel>
}
