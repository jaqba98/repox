export interface ActionModel {
  before: () => void;

  run: () => void;

  after: () => void;
}
