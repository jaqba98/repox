/**
 * The domain model uses by the system to work with package.json file.
 */

export interface PackageJsonDomainModel {
  name: string
  version: string
  private: boolean
  scripts: Record<string, string>
  devDependencies: Record<string, string>
  dependencies: Record<string, string>
}
