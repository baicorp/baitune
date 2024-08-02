import React from "react";
import { StatusScreen, ThemedSafeAreaView } from "@/components/shared";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { SongItem } from "@/components/cardItem";
import { ListSongHeader, ItemSeparator } from "@/components/flashlist";
import useSWR from "swr";
import { getPlaylist } from "@/fetch-data/data";

export default function PlaylistScreen() {
  const { browseId } = useLocalSearchParams();
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
    <ThemedSafeAreaView>
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
      />
    </ThemedSafeAreaView>
  );
}
