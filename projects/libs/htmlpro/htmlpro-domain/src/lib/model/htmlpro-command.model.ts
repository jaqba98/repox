/**
 * The command models for HtmlPro program.
 */

export interface EmptyHtmlProCommandModel {
}

export interface BuildHtmlHtmlProCommandModel {
  inputPath: string;
  outputPath: string;
}

export type THtmlProCommandModel = EmptyHtmlProCommandModel |
  BuildHtmlHtmlProCommandModel;
