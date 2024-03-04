import ExpoTextRecognitionModule from "./ExpoTextRecognitionModule";

export async function getTextFromFrame(
  inputString: string,
  isBase64 = false
): Promise<string[]> {
  return await ExpoTextRecognitionModule.getText(inputString, isBase64);
}
