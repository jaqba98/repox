/**
 * The enum file contains all kinds of parameter type
 * directly from the command line. It is responsible for
 * identifies all parts of command.
 */

export enum ParamTypeEnum {
    executor = `executor`,
    application = `application`,
    program = `program`,
    command = `command`,
    argument = `argument`,
    alias = `alias`
}
