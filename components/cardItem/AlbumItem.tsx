import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AlbumItemProps } from "@/constants/type";
import { Explicit } from "../svg";
import ThemedText from "../shared/ThemedText";
import { Link } from "expo-router";

export default function AlbumItem({
  browseId,
  title,
  thumbnail,
  description,
  explicit,
  isPlaying,
  variant = "default",
}: AlbumItemProps) {
  return (
    <Link href={`/album/${browseId}`}>
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            {explicit && <Explicit />}
            {description && (
              <ThemedText variant="subtitle">{description}</ThemedText>
            )}
          </View>
        </View>
      </View>
    </Link>
  );
}

const style = StyleSheet.create({
  link: { width: 145 },
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
