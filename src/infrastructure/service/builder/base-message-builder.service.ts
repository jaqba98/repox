import { singleton } from "tsyringe";
import { FG_RED, FG_YELLOW, RESET, REVERSE } from "../../const/color.const";

@singleton()
/**
 * Contains methods useful for building messages.
 */
export class BaseMessageBuilderService {
  buildErrorHeader(header: string): string {
    return `${FG_RED}${REVERSE} ERROR ${RESET} ${FG_RED}${header}${RESET}`;
  }

  buildError(error: string): string {
    return `${FG_RED}${REVERSE} ERR ${RESET} ${FG_RED}${error}${RESET}`;
  }

  buildTip(tip: string): string {
    return `${FG_YELLOW}${REVERSE} ERR ${RESET} ${FG_YELLOW}${tip}${RESET}`;
  }
}
