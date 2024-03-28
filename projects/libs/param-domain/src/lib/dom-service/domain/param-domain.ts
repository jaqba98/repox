import { injectable } from 'tsyringe'

import { BaseParamTypeEnum } from '../../enum/base-param-type.enum'
import { type ParamDomainArgsModel } from '../../model/param-domain.model'

@injectable()
/**
 * The domain class is a recipe how to build param domain object.
 */
export class ParamDomain {
  program: string = BaseParamTypeEnum.unknown

  command: string = BaseParamTypeEnum.unknown

  programArgs: ParamDomainArgsModel = {}

  commandArgs: ParamDomainArgsModel = {}
}
