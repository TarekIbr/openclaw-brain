export async function fakeAssistantStream(
  fullText: string,
  onToken: (chunk: string) => void,
  delayMs = 35
): Promise<void> {
  const tokens = fullText.split(/(\s+)/).filter(Boolean);

  for (const token of tokens) {
    onToken(token);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
