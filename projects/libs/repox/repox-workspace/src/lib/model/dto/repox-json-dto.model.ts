/**
 * The model DTO represents real content of repox.json file.
 */

export interface RepoxJsonDtoProjectModel {
  name: string
  root: string
  src: string
  type: string
}

export interface RepoxJsonDtoProjectsModel {
  projects: Record<string, RepoxJsonDtoProjectModel>
}

export interface RepoxJsonDtoModel extends RepoxJsonDtoProjectsModel {
}

export interface RepoxJsonDtoPartialModel extends Partial<RepoxJsonDtoModel> {}
