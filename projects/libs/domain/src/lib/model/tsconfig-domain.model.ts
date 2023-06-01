/**
 * The simplified tsconfig.json model for my purposes.
 */

export interface TsconfigDomainModel {
  compilerOptions: {
    paths: {
      [alias: string]: Array<string>;
    }
  }
}
// todo: refactor