import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import {
  BuildParamDtoAppService,
  GetParamDtoDataAppService
} from "@lib/param-dto";
import {
  BuildParamDomainAppService,
  ParamDomainAppService
} from "@lib/param-domain";
import { SelectProgramAppService } from "@lib/launcher";
import { ParamErrorMessageAppService } from "@lib/logger";
import {
  AliasEnum,
  ArgumentEnum,
  CommandAliasEnum,
  CommandEnum, GetParamDependencyService,
  ProgramAliasEnum,
  ProgramEnum,
  REPOX_LOGO
} from "@lib/workspace";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly buildParamDto: BuildParamDtoAppService,
    private readonly paramErrorMessage: ParamErrorMessageAppService,
    private readonly buildParamDomain: BuildParamDomainAppService,
    private readonly selectProgram: SelectProgramAppService,
    private readonly getParamDtoData: GetParamDtoDataAppService,
    private readonly getParamDomainData: ParamDomainAppService
  ) {
  }

  run(): void {
    this.buildParamDto.read();
    const paramDto = this.getParamDtoData.getParamDtoValidation();
    if (!paramDto.success) {
      this.paramErrorMessage.writeParamError(
        paramDto.wrongIndexes,
        paramDto.baseValues,
        paramDto.errors,
        paramDto.tips,
        REPOX_LOGO
      );
      return;
    }

    const programEnum = Object.keys(ProgramEnum).map(key => ({
      key: key, value: ProgramEnum[key as keyof typeof ProgramEnum]
    }));
    const programAliasEnum = Object.keys(ProgramAliasEnum).map(key => ({
      key: key,
      value: ProgramAliasEnum[key as keyof typeof ProgramAliasEnum]
    }));
    const commandEnum = Object.keys(CommandEnum).map(key => ({
      key: key, value: CommandEnum[key as keyof typeof CommandEnum]
    }));
    const commandAliasEnum = Object.keys(CommandAliasEnum).map(key => ({
      key: key,
      value: CommandAliasEnum[key as keyof typeof CommandAliasEnum]
    }));
    const argumentEnum = Object.keys(ArgumentEnum).map(key => ({
      key: key, value: ArgumentEnum[key as keyof typeof ArgumentEnum]
    }));
    const aliasEnum = Object.keys(AliasEnum).map(key => ({
      key: key, value: AliasEnum[key as keyof typeof AliasEnum]
    }));

    const getParamDependency = container.resolve(GetParamDependencyService);

    this.buildParamDomain.build(
      programEnum,
      programAliasEnum,
      commandEnum,
      commandAliasEnum,
      argumentEnum,
      aliasEnum,
      getParamDependency
    );
    const paramDomain = this.getParamDomainData
      .getParamDomainValidation();
    if (!paramDomain.success) {
      this.paramErrorMessage.writeParamError(
        paramDomain.wrongIndexes,
        paramDto.baseValues,
        paramDomain.errors,
        paramDomain.tips,
        REPOX_LOGO
      );
      return;
    }
    this.selectProgram.selectProgram();
  }
}

container.resolve(MainService).run();
// todo: refactor
