import { useChatStore, toggleAutoSendStreamingSTT } from "@/stores/ChatStore";
import { Button, Loader, px, createStyles, MantineTheme } from "@mantine/core";
import { useRef } from 'react';
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconX,
  IconPlayerPlay,
  IconPlayerPause,
  IconVolumeOff,
  IconVolume,
} from "@tabler/icons-react";
import ChatTextInput from "./ChatTextInput";
import { useRouter } from "next/router";
import UIControllerSettings from "./UIControllerSettings";
import * as OpusRecorder from "@/stores/RecorderActions";
import * as AzureRecorder from "@/stores/AzureRecorderActions";
import {
  addChat,
  setPlayerMode,
  setPushToTalkMode,
} from "@/stores/ChatActions";
import { toggleAudio } from "@/stores/PlayerActions";
import React, { useState } from 'react';
import ImmersiveVoiceUI from '../components/ImmersiveVoiceUI';
import ImmersiveButton from '../components/ImmersiveButton';

let originAutoSendFlg = 0; 

const styles = createStyles((theme: MantineTheme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    left: 0,
    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      left: 200,
    },
    [`@media (min-width: ${theme.breakpoints.md})`]: {
      left: 250,
    },
    right: 0,
    zIndex: 1,
    maxWidth: 820,
    margin: "0 auto",
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    height:'95vh'
  },
  playerControls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "72px"
  },
  textAreaContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "flex-end",
  },
  textArea: {
    flexGrow: 1,
  },
  recorderButton: {
    width: "72px",
  },
  recorderControls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    minHeight: "72px",
  },
  immersiveButtonContainer: { // 添加新的样式
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 100, // 设置较高的 z-index
  },
}));

const ImmersiveControls = () => {
  const { classes } = styles();

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
    <div className={classes.playerControls}>
      <Button onClick={() => setIsImmersive(true)}>进入沉浸
      </Button>
      {isImmersive && (
        <>
          <ImmersiveVoiceUI isRecording={isRecording} onStartRecording={handleStartRecording} /> 
          <div style={{ display: 'flex', justifyContent: 'center' }}> {/* 添加新的 div 容器 */}
            <ImmersiveButton
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onGoBack={handleGoBack}
            />
          </div>
        </>
      )}
    </div>
  );
};

const PlayerControls = () => {
  const { classes } = styles();

  const playerMode = useChatStore((state) => state.playerMode);
  const PlayerToggleIcon = playerMode ? IconVolumeOff : IconVolume;

  const isPlaying = useChatStore((state) => state.playerState === "playing");
  const PlayPauseIcon = isPlaying ? IconPlayerPause : IconPlayerPlay;


  return (
    <div className={classes.playerControls}>
      <Button
        sx={{ height: 36, borderRadius: "8px 0px 0px 0px" }}
        compact
        variant={playerMode ? "filled" : "light"}
        onClick={() => toggleAudio()}
      >
        {playerMode && <PlayPauseIcon size={20} />}
      </Button>

      <Button
        sx={{ height: 36, borderRadius: "0px 0px 0px 8px" }}
        compact
        variant={playerMode ? "filled" : "light"}
        onClick={() => {
          setPlayerMode(!playerMode);
        }}
      >
        <PlayerToggleIcon size={px("1.1rem")} stroke={1.5} />
      </Button>
      
    </div>
  );
};

const ChatInput = () => {
  const { classes } = styles();

  const chatInputRef = useRef<{ doSubmit: () => void } | null>(null);

  const router = useRouter();

  const editingMessage = useChatStore((state) => state.editingMessage);

  const pushToTalkMode = useChatStore((state) => state.pushToTalkMode);
  const audioState = useChatStore((state) => state.audioState);
  const autoSendStreamingSTT = useChatStore((state) => state.autoSendStreamingSTT);
 
  const activeChatId = useChatStore((state) => state.activeChatId);
  const showTextDuringPTT = useChatStore((state) => state.showTextDuringPTT);
  const showTextInput = !pushToTalkMode || showTextDuringPTT || editingMessage;

  const modelChoiceSTT = useChatStore((state) => state.modelChoiceSTT);
  const Recorder = modelChoiceSTT === "azure" ? AzureRecorder : OpusRecorder;

  console.log("rendered with audioState", audioState);

  return (
    <div className={classes.textAreaContainer}>
      {/* {showTextInput && <ChatTextInput className={classes.textArea} />} */}
      {showTextInput && <ChatTextInput ref={chatInputRef} className={classes.textArea} />}
      {pushToTalkMode && (
        <Button
          sx={{
            height: 72,
            borderRadius: "0px 0px 0px 0px",
            width: showTextInput ? "72px" : "100%",
          }}
          compact
          className={classes.recorderButton}
          onClick={() => {
            if (audioState === "idle") {
              // 开始的时候自动切换到不自动发送配置,如果是自动，先取消
              // if(autoSendStreamingSTT){
              //   toggleAutoSendStreamingSTT();
              //   originAutoSendFlg = 1;
              // }
              Recorder.startRecording(router);
            } else if (audioState === "transcribing") {
              return;
            } else {
              if (!activeChatId) {
                addChat(router);
              }
              // 结束的时候自动切换到自动发送配置
              Recorder.stopRecording(true);
              chatInputRef.current && chatInputRef.current.doSubmit && chatInputRef.current.doSubmit();
              // if(originAutoSendFlg == 1){
              //   toggleAutoSendStreamingSTT();
              //   originAutoSendFlg = 0;
              // }
            }
          }}
        >
          {audioState === "recording" ? (
            <Loader
              size="3em"
              variant="bars"
              color="white"
              sx={{ opacity: 1 }}
            />
          ) : audioState === "transcribing" ? (
            <Loader size="2em" color="white" sx={{ opacity: 1 }} />
          ) : (
            <IconMicrophone size="3em" />
          )}
        </Button>
      )}
    </div>
  );
};

const RecorderControls = () => {
  const { classes } = styles();

  const pushToTalkMode = useChatStore((state) => state.pushToTalkMode);

  const audioState = useChatStore((state) => state.audioState);

  const PushToTalkToggleIcon = pushToTalkMode
    ? IconMicrophoneOff
    : IconMicrophone;

  const showCancelButton = audioState === "recording";

  const modelChoiceSTT = useChatStore((state) => state.modelChoiceSTT);
  const Recorder = modelChoiceSTT === "azure" ? AzureRecorder : OpusRecorder;

  return (
    <div className={classes.recorderControls}>
      {showCancelButton ? (
        <Button
          sx={{ height: 36, borderRadius: "0px 8px 0px 0px" }}
          compact
          color="red"
          variant="filled"
          onClick={() => {
            Recorder.stopRecording(false);
          }}
        >
          <IconX size={px("1.1rem")} stroke={1.5} />
        </Button>
      ) : (
        <UIControllerSettings />
      )}

      <Button
        sx={{ height: 36, borderRadius: "0px 0px 8px 0px" }}
        compact
        variant={pushToTalkMode ? "filled" : "light"}
        onClick={() => {
          setPushToTalkMode(!pushToTalkMode);
          Recorder.stopRecording(false);
          if (pushToTalkMode) {
            Recorder.destroyRecorder();
          }
        }}
      >
        <PushToTalkToggleIcon size={20} />
      </Button>
    </div>
  );
};

export default function UIController() {
  const { classes } = styles();
 
  return (
    <div className={classes.container}>
      <ImmersiveControls />
      <PlayerControls />
      <ChatInput />
      <RecorderControls />
    </div>
  );
}
