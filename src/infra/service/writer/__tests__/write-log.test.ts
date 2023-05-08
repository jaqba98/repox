import { container } from "tsyringe";
import { WriteLog } from "../write-log";

describe("WriteLogService", () => {
  test("Should display correct getting message", () => {
    const msg: string = "Hello world";
    const expectedMsg: string = "Hello world";
    const consoleSpy = jest.spyOn(console, "log");
    container.resolve(WriteLog).message(msg);
    expect(consoleSpy).toHaveBeenCalledWith(expectedMsg);
  });
});
