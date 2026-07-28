export function formatSerialPortError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);

  if (
    msg.includes("Failed to open serial port") ||
    msg.includes("Permission denied") ||
    msg.includes("Access denied")
  ) {
    return [
      "Linux blocked access to /dev/ttyACM0.",
      "Run in a terminal:",
      "  sudo usermod -aG dialout $USER",
      "  sudo systemctl stop ModemManager",
      "Then log out and log back in, reopen Chrome, and click Connect again.",
    ].join(" ");
  }

  if (msg.includes("No port selected")) {
    return "No scanner port selected. Choose the STMicroelectronics device in the browser dialog.";
  }

  return msg || "Failed to connect scanner.";
}
