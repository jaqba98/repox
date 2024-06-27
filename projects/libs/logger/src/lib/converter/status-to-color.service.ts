import { singleton } from "tsyringe";

import { StatusEnum } from "@lib/core";
import {
  BG_TEXT_DEFAULT,
  BG_TEXT_ERROR,
  BG_TEXT_INFO,
  BG_TEXT_SUCCESS,
  BG_TEXT_WARNING,
  FG_TEXT_DEFAULT,
  FG_TEXT_ERROR,
  FG_TEXT_INFO,
  FG_TEXT_SUCCESS,
  FG_TEXT_WARNING
} from "../const/text-style.const";

@singleton()
export class StatusToColorService {
  convertToFg(status: StatusEnum): string {
    switch (status) {
    case StatusEnum.success:
      return FG_TEXT_SUCCESS;
    case StatusEnum.warning:
      return FG_TEXT_WARNING;
    case StatusEnum.error:
      return FG_TEXT_ERROR;
    case StatusEnum.info:
      return FG_TEXT_INFO;
    case StatusEnum.default:
      return FG_TEXT_DEFAULT;
    default:
      throw new Error(`The ${status} is not supported!`);
    }
  }

  convertToBg(status: StatusEnum): string {
    switch (status) {
    case StatusEnum.success:
      return BG_TEXT_SUCCESS;
    case StatusEnum.warning:
      return BG_TEXT_WARNING;
    case StatusEnum.error:
      return BG_TEXT_ERROR;
    case StatusEnum.info:
      return BG_TEXT_INFO;
    case StatusEnum.default:
      return BG_TEXT_DEFAULT;
    default:
      throw new Error(`The ${status} is not supported!`);
    }
  }
}
