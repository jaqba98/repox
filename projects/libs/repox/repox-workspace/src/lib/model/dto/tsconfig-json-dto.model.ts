// done
import { type CompilerOptions, type ProjectReference } from "typescript";

/**
 * The model dto represents a real content
 * of tsconfig.json file.
 */

/**
 * The model was copied directly from typescript project.
 * It has to be up to date as possible: TSConfig.
 */

export interface CompilerOptionsDtoModel extends Omit<CompilerOptions, "target" | "module"> {
  target: string
  module: string
}

export interface TsconfigJsonDtoModel {
  extends: string
  compilerOptions: Partial<CompilerOptionsDtoModel>
  compileOnSave: boolean | undefined
  exclude?: readonly string[]
  files: readonly string[] | undefined
  include?: readonly string[]
  references: readonly ProjectReference[] | undefined
}

export type PartialTsconfigJsonDtoModel = Partial<TsconfigJsonDtoModel>;
