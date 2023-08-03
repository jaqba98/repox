/**
 * The model represents dependency between programs, commands,
 * arguments and aliases for given project.
 */

export interface ParamDomainDepArgModel {
  name: string
  values: string[]
  valueMode: "empty" | "single" | "many"
  required: boolean
}

export type ParamDomainDepArgsModel = Record<string, ParamDomainDepArgModel>;

export interface ParamDomainDepCommandModel {
  command: string
  args: ParamDomainDepArgsModel
}

export type ParamDomainDepCommandsModel = Record<string, ParamDomainDepCommandModel>;

export interface ParamDomainDepModel {
  program: string
  commands: ParamDomainDepCommandsModel
  args: ParamDomainDepArgsModel
}
