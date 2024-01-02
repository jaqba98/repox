/**
 * The program model defines all methods for each program services.
 */
export interface ProgramModel {
    runProgram: (programDomain: unknown, commandDomain: unknown) => void;
}

// todo: done