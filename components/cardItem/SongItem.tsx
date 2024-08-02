import React, { ReactElement } from "react";
import {
  AlbumVariantProps,
  PlaylistVariantProps,
  SongItemProps,
} from "@/constants/type";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Explicit, MoreVertical } from "../svg";
import ThemedText from "../shared/ThemedText";
import { fontSize } from "@/constants/fontSize";

// SongItemComponent have defautl variant "playlist"
export default function SongItem({
  videoId,
  title,
  artist,
  duration,
  explicit,
  variant,
  isPlaying,
  ...rest
}: SongItemProps) {
  let VariantComponent: ReactElement;
  // chose either show the Image or Index for the SongItem based on variant
  if (variant === "album") {
    const { index } = rest as AlbumVariantProps;
    VariantComponent = (
      <View style={styleSongItem.songIndex}>
        <ThemedText>{index}</ThemedText>
      </View>
    );
  } else if (variant === "playlist") {
    const { thumbnail } = rest as PlaylistVariantProps;
    VariantComponent = (
      <View style={styleSongItem.songImage}>
        <Image source={{ uri: thumbnail }} style={styleSongItem.songImage} />
      </View>
    );
  } else {
    VariantComponent = <View></View>;
  }

  return (
    <View style={styleSongItem.container}>
      {VariantComponent}
      <View style={styleSongItem.textContainer}>
        <ThemedText variant="title" numberOfLines={1} ellipsizeMode="tail">
          {title}
        </ThemedText>
        <View style={styleSongItem.textContainerSubtitle}>
          <View
            style={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            {explicit && <Explicit />}
            <ThemedText variant="subtitle" numberOfLines={1}>
              {/* {artist + duration ? `• ${duration}` : ""} */}
              {`${artist} ${duration ? `• ${duration}` : ""}`}
            </ThemedText>
          </View>
        </View>
      </View>
      <Pressable style={styleSongItem.pressable}>
        <MoreVertical />
      </Pressable>
    </View>
  );
}

const styleSongItem = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    flexGrow: 1,
    overflow: "hidden",
    maxWidth: "70%",
  },
  textContainerSubtitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    maxWidth: "100%",
  },
  songImage: { width: 52, height: 52, borderRadius: 4 },
  songIndex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: 4,
    fontSize: fontSize.lg,
    fontWeight: "600",
  },
  pressable: { marginLeft: "auto" },
});
