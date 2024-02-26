/**
 * The model DTO represents real content of package.json file.
 */

export interface BasePackageJsonDtoModel {
    name: string;
    version: string;
    private: boolean;
}

export interface PackageJsonDtoModel extends BasePackageJsonDtoModel {
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
}

export interface PackageJsonDtoPartialModel extends Partial<PackageJsonDtoModel> {}
