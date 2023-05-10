import { singleton } from "tsyringe";
import { SimpleMessageModel } from "../model/logger-domain.model";
import {
  ConvertModeToColorService
} from "../converter/convert-mode-to-color.service";
import {
  buildHeader, buildLine,
  buildLogo,
  buildMessage
} from "../builder/base-msg-builder";

@singleton()
/**
 * The service is responsible for building messages
 * ready to be displayed on the console screen.
 */
export class BuildMessageService {
  constructor(
    private readonly convertModeToColor: ConvertModeToColorService
  ) {
  }


  buildSimpleMessage(model: SimpleMessageModel): string {
    const { message, mode, isLogo, isHeader } = model;
    const fgColor = this.convertModeToColor.modeToFg(mode);
    const bgColor = this.convertModeToColor.modeToBg(mode);
    const logo = buildLogo(bgColor, isLogo);
    const header = buildHeader(bgColor, mode, isHeader);
    const msg = buildMessage(fgColor, message);
    return [logo, header, msg]
      .filter(item => item !== "")
      .map(item => buildLine(item))
      .join(" ");
  }
}

// todo: refactor
