/**
 * The command models for htmlpro program.
 */

export interface EmptyHtmlproCommandModel {
}

export interface BuildHtmlHtmlproCommandModel {
  inputPath: string;
  outputPath: string;
}

export type THtmlproCommandModel = EmptyHtmlproCommandModel |
  BuildHtmlHtmlproCommandModel;
