export async function emulatorBlock(block: () => Promise<void>) {
  /**
     * Delete main emulator host
     * before do process
     */
  if (process.env.DEV) {
    delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9089";
  }

  await block();

  /**
     * Roll back main emulator host
     */
  if (process.env.DEV) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
  }
}
