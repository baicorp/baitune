import React from "react";
import { StatusScreen, ThemedView } from "@/components/shared";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { SongItem } from "@/components/cardItem";
import { ListSongHeader, ItemSeparator } from "@/components/flashlist";
import useSWR from "swr";
import { getAlbum } from "@/fetch-data/data";
import { AlbumVariantProps } from "@/constants/type";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";

export default function AlbumScreen() {
  const { browseId } = useLocalSearchParams();
  const { theme } = useTheme();
  const { data: albumData, isLoading, error } = useSWR(browseId, getAlbum);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }

  if (!albumData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  return (
    <ThemedView>
      <FlashList
        data={albumData.contents as AlbumVariantProps[]}
        renderItem={({ item }) => {
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
        keyExtractor={(item, index) => item.videoId + index}
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
