"use client";

import React from "react";
import { Mic as MicIcon, MessageCircle as MessageCircleIcon } from "lucide-react";

interface ActionButtonsProps {
    isRecording: boolean;
    onStartRecording: () => void;
    onGoBack: () => void;
    // onMicrophoneClick: () => void; // 添加 onMicrophoneClick 函数类型参数
  }

  const ImmersiveButton: React.FC<ActionButtonsProps> = ({
    isRecording,
    // onStartRecording, // 不再需要这个属性
    onGoBack,
    // onMicrophoneClick,
  }) => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: 20,
        left: 100,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100 
      }}
    > 
      <div 
        // style={{ 
        //   display: 'flex', 
        //   gap: '20px', /* 使用gap属性代替space-x-5 */
        //   padding: '16px', /* 使用padding属性代替p-4 */
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 使用rgba设置背景颜色和透明度 */
        //   borderRadius: '10px' /* 使用borderRadius设置圆角 */
        // }}
      >
        <button
          style={{ 
            height: '40px', /* 使用更直观的px单位设置尺寸 */
            width: '40px', 
            borderRadius: '9999px', /* 使用9999px实现圆形 */
            color: 'white',
            border: '1px solid white'
          }}
          onClick={onGoBack}
        >
          <MessageCircleIcon />
        </button>
        <button
          style={{ 
            height: '50px', 
            width: '50px', 
            borderRadius: '9999px', 
            backgroundColor: '#ef4444', /* 使用十六进制颜色值 */
            color: 'white',
            fontFamily: 'monospace' 
          }}
          onClick={() => {
            // onStartRecording(); 
            // onMicrophoneClick(); // 调用 onMicrophoneClick 函数
          }}
        >
          <MicIcon style={{ backgroundColor: 'transparent' }} />
        </button>
      </div>
    </div>
  );
};

export default ImmersiveButton;