import { singleton } from "tsyringe";

@singleton()
export class BaseStoreService<TData> {
  private data: TData | undefined;

  constructor() {
    this.data = undefined;
  }

  setData(model: TData): void {
    this.data = model;
  }

  getData(): TData {
    if (!this.data) {
      throw new Error("The store is undefined!");
    }
    return this.data;
  }
}
