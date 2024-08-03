import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ThemedText from "../shared/ThemedText";
import { colors } from "@/constants/color";
import { PlaylistItemProps } from "@/constants/type";
import { Link } from "expo-router";

export default function PlaylistItem({
  browseId,
  title,
  thumbnail,
  description,
  isPlaying,
  variant = "default",
}: PlaylistItemProps) {
  return (
    <Link href={`/playlist/${browseId}`}>
      <View
        style={
          variant === "big" ? style.containerChannelScreen : style.container
        }
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: thumbnail,
            }}
            style={variant === "big" ? style.imageChannelScreen : style.image}
          />
          {isPlaying && (
            <View style={{ position: "absolute", top: 10, right: 10 }}>
              <ThemedText>icons</ThemedText>
            </View>
          )}
        </View>
        <View style={{ display: "flex", gap: 1 }}>
          <ThemedText numberOfLines={2} variant="title">
            {title}
          </ThemedText>
          <ThemedText
            variant="subtitle"
            style={{ color: colors.dark.tint }}
            numberOfLines={2}
          >
            {description}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  containerChannelScreen: {
    display: "flex",
    width: 145,
    gap: 6,
  },
  image: { width: 52, height: 52, borderRadius: 4 },
  imageChannelScreen: { width: 145, height: 145, borderRadius: 4 },
});
