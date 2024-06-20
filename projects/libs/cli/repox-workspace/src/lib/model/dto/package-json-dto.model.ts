// done
/**
 * The model dto represents a real content
 * of package.json file.
 */

export interface PackageJsonDtoModel {
  name: string
  version: string
  private: boolean
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export type PartialPackageJsonDtoModel = Partial<PackageJsonDtoModel>;
