/**
 * The program model defines all methods for each program services.
 */
export interface ProgramModel {
    runProgram: (programModel: unknown, commandModel: unknown) => void;
}

// todo: done