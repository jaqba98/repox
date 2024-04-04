import { singleton } from 'tsyringe';

import { ParamDomainDirector } from '../dom-service/director/param-domain.director';
import {
  ParamDomainBuilder
} from '../dom-service/builder/param-domain.builder';
import { ParamDomainStore } from '../dom-service/store/param-domain.store';

@singleton()
/**
 * The app service is responsible for building
 * parameter domain model from param DTO.
 */
export class BuildParamDomainAppService {
  constructor (
    private readonly paramDomainDirector: ParamDomainDirector,
    private readonly paramDomainStore: ParamDomainStore
  ) {
  }

  build (): boolean {
    const paramDomain = this.paramDomainDirector.build(ParamDomainBuilder);
    this.paramDomainStore.set(paramDomain);
    return true;
  }
}
