/**
 * Parameters domain model which is responsible for
 * stores the prepared parameters ready to run.
 */

interface ParamsDomArgModel {
  name: string;
  val: string;
}

interface ParamsDomEntityModel {
  name: string;
  args: Array<ParamsDomArgModel>;
}

export interface ParamsDomModel {
  program: ParamsDomEntityModel;
  command: ParamsDomEntityModel;
}
