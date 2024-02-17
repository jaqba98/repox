/**
 * The model DTO represents real content of repox.json file.
 */

export interface RepoxJsonDtoProjectModel {
}

export interface RepoxJsonDtoProjectsModel {
    projects: Record<string, RepoxJsonDtoProjectModel>;
}

export interface RepoxJsonDtoModel extends RepoxJsonDtoProjectsModel {
}
