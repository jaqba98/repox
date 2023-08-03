import { singleton } from "tsyringe";
import { type LoggerLineModel } from "../../model/logger-domain.model";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import { ERR, TIP } from "../../const/logger.const";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The service is responsible for building
 * lines of errors and tips.
 */
export class BuildLineService {
  buildErrorLines (errors: string[]): LoggerLineModel[] {
    return this.baseBuildLine(errors, LoggerModeEnum.error);
  }

  buildTipLines (tips: string[]): LoggerLineModel[] {
    return this.baseBuildLine(tips, LoggerModeEnum.warning);
  }

  private baseBuildLine (
    lines: string[],
    mode: LoggerModeEnum
  ): LoggerLineModel[] {
    const headerContent = this.getLineHeader(mode);
    return lines.map(line => ({
      mode,
      logo: { visible: false, content: EMPTY_STRING },
      header: { visible: true, content: headerContent },
      words: [{ content: line, underscore: false }],
      newline: 0
    }));
  }

  private getLineHeader (mode: LoggerModeEnum): string {
    switch (mode) {
      case LoggerModeEnum.error:
        return ERR;
      case LoggerModeEnum.warning:
        return TIP;
      default:
        throw new Error(`The ${mode} is not supported logger mode!`);
    }
  }
}
