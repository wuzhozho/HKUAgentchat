// components\ImmersiveButton.tsx

import React from "react";
import { Mic as MicIcon, MicOff as MicOffIcon, MessageCircle as MessageCircleIcon } from "lucide-react"; // 导入 MicOff 图标

interface ActionButtonsProps {
    isRecording: boolean;
    onStartRecording: () => void;
    onGoBack: () => void;
    onMicrophoneClick: () => void;
}

const ImmersiveButton: React.FC<ActionButtonsProps> = ({
    isRecording,
    onGoBack,
    onMicrophoneClick,
}) => {
    return (
        <div style={{ position: 'fixed', bottom: 20, left: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
            <div>
                <button style={{ height: '40px', width: '40px', borderRadius: '9999px', color: 'white', border: '1px solid white'}} onClick={onGoBack}>
                    <MessageCircleIcon />
                </button>
                <button style={{ height: '50px', width: '50px', borderRadius: '9999px', backgroundColor: '#ef4444', color: 'white', fontFamily: 'monospace' }} onClick={onMicrophoneClick}>
                    {isRecording ? <MicOffIcon style={{ backgroundColor: 'transparent' }} /> : <MicIcon style={{ backgroundColor: 'transparent' }} />}
                </button>
            </div>
        </div>
    );
};

export default ImmersiveButton;