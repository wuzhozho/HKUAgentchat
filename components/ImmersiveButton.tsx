import React from "react";
import styled from 'styled-components';
import { Mic as MicIcon, MicOff as MicOffIcon, MessageCircle as MessageCircleIcon } from "lucide-react"; 

interface ActionButtonsProps {
    isRecording: boolean;
    onStartRecording: () => void;
    onGoBack: () => void;
    onMicrophoneClick: () => void;
}

interface AnimatedMicOffProps extends React.SVGProps<SVGSVGElement> {
    isRecording: boolean;
  }

const AnimatedMicOff = styled(MicOffIcon).attrs<AnimatedMicOffProps>(props => ({
  ...props, // 将所有属性传递给 MicOffIcon
}))<AnimatedMicOffProps>`
  animation: ${props => props.isRecording ? 'bounce 0.5s infinite alternate' : 'none'};

  @keyframes bounce {
    0% { transform: translateY(0); }
    100% { transform: translateY(-5px); }
  }
`;

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
                <AnimatedMicOff isRecording={isRecording} style={{ backgroundColor: 'transparent' }} /> 
                </button>
            </div>
        </div>
    );
};

export default ImmersiveButton;