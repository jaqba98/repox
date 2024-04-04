// done
/**
 * The model dto represents a real content
 * of package.json file.
 */

export interface PackageJsonDtoModel {
  name: string
  version: string
  description: string
  main: string
  scripts: Record<string, string>
  repository: string | { type: string, url: string }
  keywords: string[]
  author: string | { name: string, email: string, url: string }
  license: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  peerDependencies: Record<string, string>
  optionalDependencies: Record<string, string>
  bundledDependencies: string[]
  engines: Record<string, string>
  private: boolean
}

export interface PartialPackageJsonDtoModel extends Partial<PackageJsonDtoModel> {}
