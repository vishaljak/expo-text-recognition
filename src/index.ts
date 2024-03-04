import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoTextRecognition.web.ts
// and on native platforms to ExpoTextRecognition.ts
import ExpoTextRecognitionModule from './ExpoTextRecognitionModule';
import ExpoTextRecognitionView from './ExpoTextRecognitionView';
import { ChangeEventPayload, ExpoTextRecognitionViewProps } from './ExpoTextRecognition.types';

// Get the native constant value.
export const PI = ExpoTextRecognitionModule.PI;

export function hello(): string {
  return ExpoTextRecognitionModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoTextRecognitionModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoTextRecognitionModule ?? NativeModulesProxy.ExpoTextRecognition);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoTextRecognitionView, ExpoTextRecognitionViewProps, ChangeEventPayload };
