/**
 * The command models for htmlpro program.
 */

export interface EmptyHtmlproCommandModel {
}

export interface BuildHtmlHtmlproCommandModel {
  filePath: string;
}

export type THtmlproCommandModel = EmptyHtmlproCommandModel |
  BuildHtmlHtmlproCommandModel;
