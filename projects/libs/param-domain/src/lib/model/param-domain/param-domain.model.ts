/**
 * Domain parameter model for all parameters
 * prepared with param dto model.
 */

export interface BaseParamDomainModel {
    baseName: string;
    name: string;
    index: number;
}

export interface ArgParamDomainModel extends BaseParamDomainModel {
    values: string[];
    hasValue: boolean;
    hasManyValues: boolean;
}

export interface ArgsParamDomainModel {
    args: Record<string, ArgParamDomainModel>;
}

export interface ProgramDomainModel extends BaseParamDomainModel {
}

export interface CommandDomainModel extends BaseParamDomainModel {
}

export interface ProgramArgsDomainModel extends ArgsParamDomainModel {
}

export interface CommandArgsDomainModel extends ArgsParamDomainModel {
}
