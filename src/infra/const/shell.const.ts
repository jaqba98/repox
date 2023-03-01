/**
 * All kinds of constants value for the shell.
 */

/**
 * Modes of text.
 */
export const RESET = "\x1b[0m";
export const BRIGHT = "\x1b[1m"
export const REVERSE = "\x1b[7m";
export const UNDERSCORE = "\x1b[4m";

/**
 * Font colors.
 */
export const F_RED = "\x1b[31m";
export const F_GREEN = "\x1b[32m";
export const F_YELLOW = "\x1b[33m";

/**
 * Mix styles.
 */
export const F_BRIGHT_GREEN = `${BRIGHT}${F_GREEN}`;
export const B_BRIGHT_GREEN = `${F_BRIGHT_GREEN}${REVERSE}`;
export const F_BRIGHT_RED = `${BRIGHT}${F_RED}`;
export const B_BRIGHT_RED = `${F_BRIGHT_RED}${REVERSE}`;
export const F_BRIGHT_YELLOW = `${BRIGHT}${F_YELLOW}`;
export const B_BRIGHT_YELLOW = `${F_BRIGHT_YELLOW}${REVERSE}`;
