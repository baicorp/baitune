import React, { ReactElement } from "react";
import { ThemedSafeAreaView, ThemedText } from "@/components/shared";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Heart, Album, Playlist, Artist } from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";

export default function Library() {
  return (
    <ThemedSafeAreaView>
      <ThemedText variant="sectionTitle">Library</ThemedText>
      <LibraryLink text="Liked Songs" href="songs" icon={<Heart />} />
      <LibraryLink
        text="Liked Playlists"
        href="playlists"
        icon={<Playlist />}
      />
      <LibraryLink text="Liked Albums" href="albums" icon={<Album />} />
      <LibraryLink text="Liked Artists" href="artists" icon={<Artist />} />
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
      onPress={() => router.push(`library/${href}`)}
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
