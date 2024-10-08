import { createStyles, MantineTheme } from "@mantine/core";
import ChatTextInput from "./ChatTextInput";

const styles = createStyles((theme: MantineTheme) => ({
  inputWrapper: {
    flexShrink: 0,
    // Always stick to the bottom of the chat
    position: "fixed",
    bottom: 0,
    left: 0,
    // right: 0,
    zIndex: 1,
    maxWidth: 820,
    margin: "0 auto",
    padding: theme.spacing.md,
  },
  input: {
    // Always stick to the bottom of the chat
    position: "relative",
  },
}));

export default function ChatInput() {
  const { classes } = styles();

  return (
    <div className={classes.inputWrapper}>
      <ChatTextInput />
    </div>
  );
}
