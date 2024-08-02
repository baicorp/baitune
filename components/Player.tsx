import React, { useState } from "react";
import { Modal, Pressable, SafeAreaView, View } from "react-native";
import { usePathname } from "expo-router";
import { ThemedText } from "./shared";

export default function Player() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <View
      style={{
        position: "absolute",
        bottom:
          pathName == "/" || pathName == "/explore" || pathName == "/library"
            ? 49
            : 0,
        backgroundColor: "gray",
        height: 55,
        width: "100%",
      }}
    >
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={{ width: "100%", height: "100%", backgroundColor: "red" }}
      >
        <ThemedText>
          {isOpen.toString()} {pathName}
        </ThemedText>
        <MusicPlayer isOpen={isOpen} setIsOpen={setIsOpen} />
      </Pressable>
    </View>
  );
}

function MusicPlayer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <SafeAreaView>
      {/* <ThemedView> */}
      <Modal animationType="slide" visible={isOpen}>
        <ThemedText>hello world</ThemedText>
        <Pressable
          onPress={() => setIsOpen(false)}
          style={{ padding: 10, borderWidth: 1, borderColor: "red" }}
        >
          <ThemedText>close</ThemedText>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
