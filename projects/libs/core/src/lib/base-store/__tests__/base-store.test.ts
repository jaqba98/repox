import { container } from "tsyringe";
import { BaseStoreService } from "../base-store.service";

interface ExampleModel {
  prop1: string;
  prop2: boolean;
  prop3: Array<string>;
  prop4: {
    prop41: boolean;
    prop42: Array<string>;
  }
}

describe("BaseStoreService", () => {
  beforeEach(() => {
    container.reset();
  });

  test("Should be correct when the data are set", () => {
    const service = container.resolve(BaseStoreService<ExampleModel>);
    service.setData({
      prop1: "hello",
      prop2: true,
      prop3: ["a", "b", "c"],
      prop4: {
        prop41: false,
        prop42: ["A", "B", "C"]
      }
    });
    expect(service.getData()).toEqual(<ExampleModel>{
      prop1: "hello",
      prop2: true,
      prop3: ["a", "b", "c"],
      prop4: {
        prop41: false,
        prop42: ["A", "B", "C"]
      }
    });
  });

  test("Should not be correct when the data are not set", () => {
    const service = container.resolve(BaseStoreService<ExampleModel>);
    expect(() => service.getData()).toThrow(
      "The store is undefined!"
    );
  });

  test("Should be correct 1", () => {
    const service = container.resolve(BaseStoreService<ExampleModel>);
    service.setData({
      prop1: "hello",
      prop2: true,
      prop3: ["a", "b", "c"],
      prop4: {
        prop41: false,
        prop42: ["A", "B", "C"]
      }
    });
    service.setItem<string[]>(["prop4", "prop42"], ["AA", "BB", "CC"]);
    expect(service.getItem<string[]>(["prop4", "prop42"])).toEqual(["AA", "BB", "CC"]);
  });

  test("Should be correct", () => {
    const service = container.resolve(BaseStoreService<ExampleModel>);
    service.setData({
      prop1: "hello",
      prop2: true,
      prop3: ["a", "b", "c"],
      prop4: {
        prop41: false,
        prop42: ["A", "B", "C"]
      }
    });
    expect(service.getItem<boolean>(["prop4", "prop41"])).toBeFalsy();
  });
});
