import {
  buildSuccessMsg,
  buildEmptyString,
  buildSuccessHeader,
  buildReset,
  buildSpace
} from "./base-msg-builder.service";

/**
 * The messages builder for all success
 */

export const buildCommandExecutedCorrectlyMsg = (): string =>
  buildEmptyString()
    .concat(buildSuccessHeader())
    .concat(buildSpace())
    .concat(buildSuccessMsg('Command executed correctly'))
    .concat(buildReset())
