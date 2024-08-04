import { PlaylistItem } from "@/components/cardItem";
import { ItemSeparator } from "@/components/flashlist";
import {
  StatusScreen,
  ThemedScrollView,
  ThemedText,
  ThemedView,
} from "@/components/shared";
import { PlaylistItemProps } from "@/constants/type";
import { getSelectedMoodsAndGenre } from "@/fetch-data/data";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";
import useSWR from "swr";

export default function ParamsScreen() {
  const { params } = useLocalSearchParams();
  const {
    data: selectedMoodsAndGenreData,
    isLoading,
    error,
  } = useSWR(params, getSelectedMoodsAndGenre);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }
  if (!selectedMoodsAndGenreData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }
  return (
    <ThemedScrollView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        {selectedMoodsAndGenreData?.map((data: any, index: any) => {
          return (
            <HorizontalScroll
              key={index}
              title={data?.title}
              data={data?.data}
            />
          );
        })}
      </ThemedView>
    </ThemedScrollView>
  );
}

function HorizontalScroll(extractedData: {
  title: string;
  data: PlaylistItemProps[];
}) {
  return (
    <View>
      <ThemedText variant="sectionTitle" style={{ paddingHorizontal: 16 }}>
        {extractedData?.title}
      </ThemedText>
      <FlashList
        data={extractedData.data}
        renderItem={({ item, index }) => {
          const lastIndex = extractedData.data?.length - 1;
          return (
            <View
              style={{
                paddingLeft: index === 0 ? 16 : 0,
                paddingRight: index === lastIndex ? 16 : 0,
              }}
            >
              <PlaylistItem
                browseId={item?.browseId}
                title={item?.title}
                thumbnail={item?.thumbnail}
                description={item?.description}
                variant="big"
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => item?.browseId + index}
        estimatedItemSize={210}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
