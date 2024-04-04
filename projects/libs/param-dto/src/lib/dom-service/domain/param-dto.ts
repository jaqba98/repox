import { injectable } from 'tsyringe';

import { type ArgumentParamDtoModel, type BaseParamDtoModel } from '../../model/param-dto.model';

@injectable()
/**
 * The domain class is a recipe how to build param dto object.
 */
export class ParamDto {
  baseArgs: string[] | undefined;

  program: BaseParamDtoModel | undefined;

  command: BaseParamDtoModel | undefined;

  programArgs: ArgumentParamDtoModel[] | undefined;

  commandArgs: ArgumentParamDtoModel[] | undefined;
}
