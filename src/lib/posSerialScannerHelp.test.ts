import { describe, expect, it } from "vitest";
import { formatSerialPortError } from "./posSerialScannerHelp";

describe("formatSerialPortError", () => {
  it("explains Linux dialout when open fails", () => {
    const msg = formatSerialPortError(
      new DOMException("Failed to open serial port."),
    );
    expect(msg).toContain("dialout");
    expect(msg).toContain("ModemManager");
  });
});
