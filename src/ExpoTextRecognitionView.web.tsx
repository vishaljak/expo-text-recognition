import * as React from 'react';

import { ExpoTextRecognitionViewProps } from './ExpoTextRecognition.types';

export default function ExpoTextRecognitionView(props: ExpoTextRecognitionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
