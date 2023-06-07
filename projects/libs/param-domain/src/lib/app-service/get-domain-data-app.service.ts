import { singleton } from "tsyringe";
import {
  ParamDomainStoreService
} from "../dom-service/store/param-domain-store.service";

@singleton()
/**
 * The service is responsible for get data from param domain store.
 */
export class GetDomainDataAppService {
  constructor(
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  getProgramName(): string {
    return this.paramDomainStore.getParamDomain().program.name;
  }

  getCommandName(): string {
    return this.paramDomainStore.getParamDomain().command.name;
  }
}