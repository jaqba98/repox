import { container, singleton } from 'tsyringe';

import { type ParamDomainAbstractBuilder } from './param-domain-abstract.builder';
import { ParamDomain } from '../domain/param-domain';
import { type ArgumentParamDtoModel, ParamDtoStore } from '@lib/param-dto';
import { type ParamDomainArgsModel } from '../../model/param-domain.model';

@singleton()
/**
 * The builder contains methods to build every single param domain element.
 */
export class ParamDomainBuilder implements ParamDomainAbstractBuilder {
  readonly paramDomain: ParamDomain;

  constructor (private readonly paramDtoStore: ParamDtoStore) {
    this.paramDomain = container.resolve(ParamDomain);
  }

  buildProgram (): ParamDomainAbstractBuilder {
    const paramDto = this.paramDtoStore.get();
    const { program } = paramDto;
    if (program == null) return this;
    this.paramDomain.program = program.baseValue;
    return this;
  }

  buildCommand (): ParamDomainAbstractBuilder {
    const paramDto = this.paramDtoStore.get();
    const { command } = paramDto;
    if (command == null) return this;
    this.paramDomain.command = command.baseValue;
    return this;
  }

  buildProgramArgs (): ParamDomainAbstractBuilder {
    const paramDto = this.paramDtoStore.get();
    const { programArgs } = paramDto;
    if (programArgs == null) return this;
    this.paramDomain.programArgs = programArgs
      .reduce((acc: ParamDomainArgsModel, curr: ArgumentParamDtoModel) => {
        acc[curr.name] = {
          values: curr.values,
          hasValue: curr.hasValue,
          hasManyValues: curr.hasManyValues
        };
        return acc;
      }, {});
    return this;
  }

  buildCommandArgs (): ParamDomainAbstractBuilder {
    const paramDto = this.paramDtoStore.get();
    const { commandArgs } = paramDto;
    if (commandArgs == null) return this;
    this.paramDomain.commandArgs = commandArgs
      .reduce((acc: ParamDomainArgsModel, curr: ArgumentParamDtoModel) => {
        acc[curr.name] = {
          values: curr.values,
          hasValue: curr.hasValue,
          hasManyValues: curr.hasManyValues
        };
        return acc;
      }, {});
    return this;
  }

  build (): ParamDomain {
    return this.paramDomain;
  }
}
