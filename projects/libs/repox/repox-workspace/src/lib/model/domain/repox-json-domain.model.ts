// done
import {
  type RepoxJsonDtoTargetModel,
  type RepoxJsonDtoDefaultOptionsModel,
  type RepoxJsonDtoProjectModel
} from '../dto/repox-json-dto.model';

/**
 * The model domain of repox configuration.
 */

export type RepoxJsonDomainDefaultOptionsModel = RepoxJsonDtoDefaultOptionsModel;

export type RepoxJsonDomainTargetModel = RepoxJsonDtoTargetModel;

export type RepoxJsonDomainProjectModel = RepoxJsonDtoProjectModel;

export interface RepoxJsonDomainModel {
  defaultOptions: RepoxJsonDomainDefaultOptionsModel
  projects: Record<string, RepoxJsonDomainProjectModel>
}
