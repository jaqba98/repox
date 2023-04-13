import { container } from "tsyringe";
import { WriteLogService } from "../write-log.service";

/** Testing of the WriteLogService service. */

describe("WriteLogService", () => {
  test("Should display correct getting message", () => {
    const msg: string = "Hello world";
    const expectedMsg: string = "Hello world";
    const consoleSpy = jest.spyOn(console, "log");
    container.resolve(WriteLogService).message(msg);
    expect(consoleSpy).toHaveBeenCalledWith(expectedMsg);
  });
});
