import { StatusEnum } from "@lib/core";

export interface LoggerWordModel {
  content: string;
  underline: boolean;
  visible: boolean;
}

export interface LoggerLineModel {
  status: StatusEnum;
  logo: LoggerWordModel;
  header: LoggerWordModel;
  words: LoggerWordModel[];
  newline: number;
}

export interface LoggerDomainModel {
  lines: LoggerLineModel[];
}
