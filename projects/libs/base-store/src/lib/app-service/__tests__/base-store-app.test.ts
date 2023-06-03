import { container } from "tsyringe";
import { BaseStoreAppService } from "../base-store-app.service";

interface BaseStoreExampleModel {
  prop1: string;
  prop2: boolean;
  prop3: Array<string>;
  prop4: {
    prop41: boolean;
    prop42: Array<string>;
  }
}

describe("BaseStoreAppService", () => {
  beforeEach(() => {
    container.reset();
  })

  test("Should be correct when the data are set", () => {
    const service = container.resolve(
      BaseStoreAppService<BaseStoreExampleModel>
    );
    service.setData({
      prop1: "hello",
      prop2: true,
      prop3: ["a", "b", "c"],
      prop4: {
        prop41: false,
        prop42: ["A", "B", "C"]
      }
    });
    expect(service.getData()).toEqual(<BaseStoreExampleModel>{
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
    const service = container.resolve(
      BaseStoreAppService<BaseStoreExampleModel>
    );
    expect(() => service.getData()).toThrow(
      "The store is undefined!"
    );
  });
});
