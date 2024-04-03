// done
import { type RepoxJsonDomainModel } from './repox-json-domain.model'

/**
 * The workspace domain model uses by the system
 * to work with workspace files.
 */

export interface WorkspaceDomainModel {
  repoxJsonDomain: RepoxJsonDomainModel
}
