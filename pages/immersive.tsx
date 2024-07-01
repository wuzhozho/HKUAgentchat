"use client";

import React, { useState } from 'react';
import ImmersiveVoiceUI from '../components/ImmersiveVoiceUI';
import ImmersiveButton from '../components/ImmersiveButton';

const Immersive = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleGoBack = () => {
    setIsImmersive(false);
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={() => setIsImmersive(true)}>进入沉浸</button>
      {isImmersive && (
        <>
          <ImmersiveVoiceUI isRecording={isRecording} onStartRecording={handleStartRecording} /> 
          <ImmersiveButton
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onGoBack={handleGoBack}
          />
        </>
      )}
    </div>
  );
};

export default Immersive;