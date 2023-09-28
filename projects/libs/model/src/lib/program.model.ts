/**
 * The model is responsible for define methods
 * for each program services.
 */
export interface ProgramModel {
    run: (programDomain: unknown, commandDomain: unknown) => void;
}
