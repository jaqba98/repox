import { singleton } from "tsyringe";
import { LoggerLineModel } from "../../model/logger-domain.model";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";

@singleton()
/**
 * The service is responsible for building lines of errors and tips.
 */
export class BuildLinesService {
  buildErrorLines(errors: Array<string>): Array<LoggerLineModel> {
    return this.baseBuildLines(errors, LoggerModeEnum.error, "ERR");
  }

  buildTipLines(tips: Array<string>): Array<LoggerLineModel> {
    return this.baseBuildLines(tips, LoggerModeEnum.warning, "TIP");
  }

  private baseBuildLines(
    lines: Array<string>,
    mode: LoggerModeEnum,
    headerContent: string
  ): Array<LoggerLineModel> {
    return lines.map(line => ({
      message: [{ value: line, underscore: false }],
      mode,
      isLogo: false,
      isHeader: true,
      headerContent,
      newline: 0
    }));
  }
}
// todo: refactor
