/**
 * Parameters domain model used in every single program.
 */
export interface ParamsDomainArgumentModel {
  name: string;
  value: string;
  isAlias: boolean;
}

export interface ParamsDomainElementModel {
  name: string;
  arguments: Array<ParamsDomainArgumentModel>;
}

export interface ParamsDomainModel {
  program: ParamsDomainElementModel;
  command: ParamsDomainElementModel;
}
