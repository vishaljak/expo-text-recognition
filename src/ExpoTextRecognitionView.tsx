import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoTextRecognitionViewProps } from './ExpoTextRecognition.types';

const NativeView: React.ComponentType<ExpoTextRecognitionViewProps> =
  requireNativeViewManager('ExpoTextRecognition');

export default function ExpoTextRecognitionView(props: ExpoTextRecognitionViewProps) {
  return <NativeView {...props} />;
}
