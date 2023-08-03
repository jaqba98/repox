/**
 * The model is responsible for define methods
 * for each program services.
 */
export interface RunProgramModel {
  runProgram: (programDomain: unknown, commandDomain: unknown) => void
}
