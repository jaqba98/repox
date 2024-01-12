/**
 * The model is representation of real package.json file on the disc.
 */
export interface PackageJsonDtoModel {
  name?: string;
  version?: string;
  description?: string;
  scripts?: Record<string, string>;
  keywords?: string[];
  author?: string;
  license?: string;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
}

