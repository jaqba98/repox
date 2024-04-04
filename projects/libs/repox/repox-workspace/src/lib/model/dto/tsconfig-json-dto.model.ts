// done
import { type CompilerOptions, type ProjectReference } from 'typescript';

/**
 * The model dto represents a real content
 * of tsconfig.json file.
 */

/**
 * The model was copied directly from typescript project.
 * It has to be up to date as possible: TSConfig.
 */
export interface TsconfigJsonDtoModel {
  compilerOptions: CompilerOptions
  compileOnSave: boolean | undefined
  exclude?: readonly string[]
  files: readonly string[] | undefined
  include?: readonly string[]
  references: readonly ProjectReference[] | undefined
}

export interface PartialTsconfigJsonDtoModel extends Partial<TsconfigJsonDtoModel> {
}
