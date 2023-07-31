/**
 * The program models for HtmlPro program.
 */

export interface EmptyHtmlProProgramModel {
}

export interface DefaultDefaultHtmlProProgramModel {
  showVersion: boolean;
}

export interface InitDefaultHtmlProProgramModel {
  isForce: boolean;
}

export interface BuildDefaultHtmlProProgramModel {
  inputPath: string;
  outputPath: string;
}

export type THtmlProProgramModel = EmptyHtmlProProgramModel |
  DefaultDefaultHtmlProProgramModel | InitDefaultHtmlProProgramModel |
  BuildDefaultHtmlProProgramModel;
