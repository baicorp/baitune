import { View, Image, StyleSheet } from "react-native";
import { ExpandableText, ThemedText } from "@/components/shared";
import { BaseAlbumAndPlaylistData } from "@/constants/type";
import { Link } from "expo-router";

interface ListSongHeaderProps extends BaseAlbumAndPlaylistData {
  variant?: "album" | "playlist";
  artists?: { name: string; browseId: string };
}

export default function ListSongHeader({
  thumbnail,
  title,
  subtitle,
  stat,
  description,
  artists,
  variant = "playlist",
}: ListSongHeaderProps) {
  return (
    <View style={style.container}>
      <ThemedText variant="listTitle" style={style.text} numberOfLines={3}>
        {title}
      </ThemedText>
      <View style={style.textContainer}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={style.image}
        />
        <ThemedText variant="subtitle" style={style.text} numberOfLines={1}>
          {subtitle}
        </ThemedText>
        {variant === "album" ? (
          <Link href={`/channel/${artists?.browseId}`} style={style.link}>
            <ThemedText variant="subtitle" style={style.text} numberOfLines={1}>
              {artists?.name}
            </ThemedText>
          </Link>
        ) : null}
        <ThemedText variant="subtitle" style={style.text} numberOfLines={1}>
          {stat}
        </ThemedText>
        {description && (
          <ExpandableText textAlign="center" description={description} />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 40,
  },
  image: { width: "70%", aspectRatio: 1 },
  textContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  text: { textAlign: "center" },
  link: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
