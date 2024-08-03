import React from "react";
import { StatusScreen, ThemedView } from "@/components/shared";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { SongItem } from "@/components/cardItem";
import { ListSongHeader, ItemSeparator } from "@/components/flashlist";
import useSWR from "swr";
import { getPlaylist } from "@/fetch-data/data";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";

export default function PlaylistScreen() {
  const { browseId } = useLocalSearchParams();
  const { theme } = useTheme();
  const {
    data: playlistData,
    isLoading,
    error,
  } = useSWR(browseId, getPlaylist);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }

  if (!playlistData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  return (
    <ThemedView>
      <FlashList
        data={playlistData.contents}
        renderItem={({ item, index }) => (
          <SongItem
            artist={item.artist}
            title={item.title}
            thumbnail={item.thumbnail}
            videoId={item.videoId}
            duration={item.duration}
            explicit={item.explicit}
            variant="playlist"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={52}
        ListHeaderComponent={
          <ListSongHeader
            title={playlistData?.title}
            thumbnail={playlistData?.thumbnail}
            subtitle={playlistData?.subtitle}
            stat={playlistData?.stat}
            description={playlistData?.description}
          />
        }
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor:
            theme === "light"
              ? colors.light.background
              : colors.dark.background,
          paddingBottom: 20,
          paddingHorizontal: 16,
        }}
      />
    </ThemedView>
  );
}
