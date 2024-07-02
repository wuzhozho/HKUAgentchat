"use client";

import React from "react";
import { Mic as MicIcon, MessageCircle as MessageCircleIcon } from "lucide-react";

// components/ImmersiveButton.tsx 的修改
interface ActionButtonsProps {
    isRecording: boolean;
    onStartRecording: () => void;
    onGoBack: () => void;
    onMicrophoneClick: () => void; // 添加 onMicrophoneClick 函数类型参数
}

const ImmersiveButton: React.FC<ActionButtonsProps> = ({
    isRecording,
    onGoBack,
    onMicrophoneClick, // 使用这个 prop
}) => {
    return (
        <div style={{ position: 'fixed', bottom: 20, left: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
            <div>
                <button style={{ height: '40px', width: '40px', borderRadius: '9999px', color: 'white', border: '1px solid white'}} onClick={onGoBack}>
                    <MessageCircleIcon />
                </button>
                <button style={{ height: '50px', width: '50px', borderRadius: '9999px', backgroundColor: '#ef4444', color: 'white', fontFamily: 'monospace' }} onClick={onMicrophoneClick}>
                    <MicIcon style={{ backgroundColor: 'transparent' }} />
                </button>
            </div>
        </div>
    );
};

export default ImmersiveButton;