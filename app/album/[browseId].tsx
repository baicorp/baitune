import React from "react";
import { StatusScreen, ThemedSafeAreaView } from "@/components/shared";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { SongItem } from "@/components/cardItem";
import { ListSongHeader, ItemSeparator } from "@/components/flashlist";
import useSWR from "swr";
import { getAlbum } from "@/fetch-data/data";

export default function AlbumScreen() {
  const { browseId } = useLocalSearchParams();
  const { data: albumData, isLoading, error } = useSWR(browseId, getAlbum);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }

  if (!albumData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  return (
    <ThemedSafeAreaView>
      <FlashList
        data={albumData.contents}
        renderItem={({ item }) => {
          console.log(item.artist);
          return (
            <SongItem
              artist={item.artist}
              title={item.title}
              videoId={item.videoId}
              duration={item.duration}
              explicit={item.explicit}
              index={item.index}
              variant="album"
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={52}
        ListHeaderComponent={
          <ListSongHeader
            title={albumData?.title}
            thumbnail={albumData?.thumbnail}
            subtitle={albumData?.subtitle}
            stat={albumData?.stat}
            variant="album"
            artists={albumData.artists}
            description={albumData?.description}
          />
        }
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    </ThemedSafeAreaView>
  );
}
