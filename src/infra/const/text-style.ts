/**
 * Constants to define text styles such as:
 * - text modes
 * - text foreground colors
 * - text background colors
 */

export const TEXT_RESET: string = `\x1b[0m`;
export const TEXT_BRIGHT: string = `\x1b[1m`;
export const TEXT_UNDERSCORE: string = `\x1b[4m`;

export const FG_TEXT_RED: string = `\x1b[31m`;
export const FG_TEXT_GREEN: string = `\x1b[32m`;
export const FG_TEXT_YELLOW: string = `\x1b[33m`;
export const FG_TEXT_CYAN: string = `\x1b[36m`;
export const FG_TEXT_GRAY: string = `\x1b[90m`;

export const BG_TEXT_RED: string = `\x1b[41m`;
export const BG_TEXT_GREEN: string = `\x1b[42m`;
export const BG_TEXT_YELLOW: string = `\x1b[43m`;
export const BG_TEXT_CYAN: string = `\x1b[46m`;
export const BG_TEXT_GRAY: string = `\x1b[100m`;
