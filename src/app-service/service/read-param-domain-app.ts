import { singleton } from "tsyringe";
import {
  BuildParamDomain
} from "../../dom-service/builder/build-param-domain";
import {
  ParamDtoModel
} from "../../infra/model/param-dto/param-dto-model";

@singleton()
/**
 * The app service is responsible for build and validate
 * the parameter config model.
 */
export class ReadParamDomainApp {
  constructor(
    private readonly buildParamDomain: BuildParamDomain
  ) {
  }

  build(paramDto: ParamDtoModel): any {
    return this.buildParamDomain.build(paramDto);
  }
}
