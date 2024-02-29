/**
 * The model DTO represents real content of repox.json file.
 */
import {PackageJsonDtoModel} from "./package-json-dto.model";

export interface RepoxJsonDtoProjectModel {
}

export interface RepoxJsonDtoProjectsModel {
    projects: Record<string, RepoxJsonDtoProjectModel>;
}

export interface RepoxJsonDtoModel extends RepoxJsonDtoProjectsModel {
}

export interface RepoxJsonDtoPartialModel extends Partial<RepoxJsonDtoModel> {}
