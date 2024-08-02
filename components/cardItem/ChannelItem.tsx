import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ChannelItemProps } from "@/constants/type";
import { Link } from "expo-router";
import ThemedText from "../shared/ThemedText";

export default function ChannelItem({
  browseId,
  thumbnail,
  channelName,
  subscribers,
  variant = "default",
}: ChannelItemProps) {
  return (
    <Link href={`/channel/${browseId}`}>
      <View style={variant === "big" ? style.containerBig : style.container}>
        <Image
          source={{ uri: thumbnail }}
          style={variant === "big" ? style.imageBig : style.image}
        />
        <View
          style={
            variant === "big" ? style.textContainerBig : style.textContainer
          }
        >
          <ThemedText
            variant="title"
            numberOfLines={2}
            style={variant === "big" && { textAlign: "center" }}
          >
            {channelName}
          </ThemedText>
          {subscribers && (
            <ThemedText
              variant="subtitle"
              style={variant === "big" && { textAlign: "center" }}
            >
              {subscribers}
            </ThemedText>
          )}
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
  containerBig: {
    display: "flex",
    width: 145,
    gap: 8,
  },
  textContainer: {
    display: "flex",
    gap: 4,
  },
  textContainerBig: {
    display: "flex",
    gap: 2,
  },
  image: { width: 52, height: 52, borderRadius: 52 },
  imageBig: { width: 145, height: 145, borderRadius: 145 },
});
