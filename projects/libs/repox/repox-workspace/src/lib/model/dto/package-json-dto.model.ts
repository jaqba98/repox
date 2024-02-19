/**
 * The model DTO represents real content of package.json file.
 */

export interface PackageJsonDtoModel {
    name: string;
    version: string;
    description: string;
    scripts: Record<string, string>;
    keywords: string[];
    author: string;
    license: string;
    devDependencies: Record<string, string>;
}

export interface PackageJsonDtoPartialModel extends Partial<PackageJsonDtoModel> {}
