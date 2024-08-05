import React, { ReactElement, useEffect, useState } from "react";
import {
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from "@/components/shared";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Heart, Album, Playlist, Artist } from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";
import { getMusic } from "@/fetch-data/data";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

export default function Library() {
  const [sound, setSound] = useState<Sound>();

  async function playSound() {
    console.log("Loading Sound");
    const songUrl = await getMusic("3vDetD8cW_o");
    console.log(songUrl);
    const { sound } = await Audio.Sound.createAsync({
      uri: songUrl,
    });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ThemedSafeAreaView>
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedText variant="sectionTitle">Library</ThemedText>
        <LibraryLink text="Liked Songs" href="songs" icon={<Heart />} />
        <LibraryLink
          text="Liked Playlists"
          href="playlists"
          icon={<Playlist />}
        />
        <LibraryLink text="Liked Albums" href="albums" icon={<Album />} />
        <LibraryLink text="Liked Artists" href="artists" icon={<Artist />} />
        <Pressable
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "green",
          }}
          onPress={() => playSound()}
        >
          <ThemedText>Play</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

function LibraryLink({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon: ReactElement;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`../library/${href}`)}
      style={style.libraryPressable}
    >
      <View
        style={[
          style.svgContainer,
          {
            backgroundColor:
              theme === "light"
                ? colors.dark.background
                : colors.light.background,
          },
        ]}
      >
        {icon}
      </View>
      <ThemedText variant="title">{text}</ThemedText>
    </Pressable>
  );
}

const style = StyleSheet.create({
  libraryPressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  svgContainer: {
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 13,
  },
});
