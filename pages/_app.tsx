import { AppProps } from "next/app";
import Head from "next/head";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "highlight.js/styles/stackoverflow-dark.css";

import { useChatStore } from "@/stores/ChatStore";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import UIController from "@/components/UIController";
import { setColorScheme } from "@/stores/ChatActions";
import AudioPlayer from "@/components/AudioPlayer";
import '../i18n';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const colorScheme = useChatStore((state) => state.colorScheme);
  const isImmersive = useChatStore((state) => state.isImmersive);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  const apiKey = useChatStore((state) => state.apiKey);
  const playerMode = useChatStore((state) => state.playerMode);

  const [isHydrated, setIsHydrated] = useState(false);

  const chatrole = useChatStore((state) => state.role);
  const showrole = useChatStore((state) => state.showrole);
  const isShow = false;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>港大-商学院-LLM-Chatbot实验平台</title>
        <meta name="description" content="港大-商学院-LLM-Chatbot实验平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "bluu",
            colors: {
              bluu: [
                "#e8edff",
                "#c2c8f3",
                "#9aa3e5",
                "#727ed9",
                "#4c59cd",
                "#3240b3",
                "#26318d",
                "#1a2366",
                "#0e1540",
                "#04061b",
              ],
              dark: [
                "#eef1fd",
                "#d1d4e3",
                "#b3b7cb",
                "#959ab5",
                "#787e9f",
                "#5f6486",
                "#494e69",
                "#34384c",
                "#1e212f",
                "#070b16",
              ],
            },
          }}
        >
          <Notifications />
          <AppShell
            padding={0}
            navbar={isImmersive ? <></> : <Nav />}
            layout="alt"
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
                display: 'flex', // 使用 flex 布局
              },
            })}
          >
            <div v-if="user" style={{ 
              width: '22%', // 将宽度调整为 25%
              position: 'fixed', 
              height: '100vh', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0.5rem'
            }}>
              <img
                src={chatrole?.role_pic}
                style={{
                  width: '75%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginTop: '2rem'
                }} 
              />
              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <p>{chatrole?.role_name1}</p>
                <p>{chatrole?.role_name2}</p>
              </div>
            </div>
            <div style={{ 
              width: '75%', // 将宽度调整为 75%
              marginLeft: '25%', // 将左边距调整为 25%
              overflowY: 'auto', 
              display: 'flex', // 将聊天内容区域设置为 flex 容器
              flexDirection: 'column',
              flexGrow: 1,
            }}>
              <Component {...pageProps} />

              <div style={{ width: '50%' }}> {/* 为 UIController 添加一个宽度为 50% 的父元素 */}
                {apiKey && <UIController />} 
              </div>
            </div>

            {playerMode && <AudioPlayer />}
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}