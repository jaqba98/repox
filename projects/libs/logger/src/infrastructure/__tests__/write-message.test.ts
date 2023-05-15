import { container } from "tsyringe";
import { WriteMessageService } from "../write-message.service";

describe("WriteLogService", () => {
  test("Should display correct getting message", () => {
    const msg: string = "Hello world";
    const expectedMsg: string = "Hello world";
    const consoleSpy = jest.spyOn(console, "log");
    container.resolve(WriteMessageService).write(msg);
    expect(consoleSpy).toHaveBeenCalledWith(expectedMsg);
  });
});
// todo: refactor