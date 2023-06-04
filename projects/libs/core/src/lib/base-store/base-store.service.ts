import { singleton } from "tsyringe";

@singleton()
/**
 * The base store service provides crude store operations.
 * It extends other specific stores.
 */
export class BaseStoreService<TData> {
  private data: TData | undefined;

  constructor() {
    this.data = undefined;
  }

  setData(data: TData): void {
    this.data = data;
  }

  getData(): TData {
    if (!this.data) {
      throw new Error("The store is undefined!");
    }
    return this.data;
  }
}
