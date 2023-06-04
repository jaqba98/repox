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

  setItem<TItem>(path: string[], value: TItem): void {
    this.setCurrentItem<TItem>(this.data, path, value);
  }

  getItem<TItem>(path: string[]): TItem {
    return this.getCurrentItem<TItem>(this.data, path);
  }

  private setCurrentItem<TItem>(
    currentData: any, paths: string[], value: TItem
  ): void {
    const [firstPath, ...remainingPaths] = paths;
    if (firstPath === undefined) {
      throw new Error("The path element is undefined!");
    }
    if (remainingPaths.length === 0) {
      currentData[firstPath] = value;
      return;
    }
    if (currentData[firstPath] === undefined) {
      throw new Error("The data element is undefined!");
    }
    this.setCurrentItem<TItem>(
      currentData[firstPath], remainingPaths, value
    );
  }

  private getCurrentItem<TItem>(
    currentData: any, paths: string[]
  ): TItem {
    const [firstPath, ...remainingPaths] = paths;
    if (firstPath === undefined) {
      throw new Error("The path element is undefined!");
    }
    const dataElement = currentData[firstPath];
    if (dataElement === undefined) {
      throw new Error("The data element is undefined!");
    }
    return remainingPaths.length === 0
      ? dataElement
      : this.getCurrentItem<TItem>(dataElement, remainingPaths);
  }
}
