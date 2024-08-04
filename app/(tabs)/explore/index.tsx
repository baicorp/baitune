import React, { Suspense } from "react";
import {
  StatusScreen,
  ThemedScrollView,
  ThemedText,
  ThemedView,
} from "@/components/shared";
import { Link, useRouter } from "expo-router";
import useSWR from "swr";
import { getMoodsAndGenre, search } from "@/fetch-data/data";
import { Pressable, SectionList, Text, View } from "react-native";
import { Search } from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";
import { FlashList } from "@shopify/flash-list";
import { ItemSeparator } from "@/components/flashlist";
import {
  ExtractedMoodsAndGenre,
  MoodsAndgenreItemProps,
} from "@/constants/type";

export default function Explore() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ThemedView style={{ paddingHorizontal: 16 }}>
      <Pressable
        onPress={() => {
          router.push("/explore/search");
        }}
        style={{
          borderRadius: 100,
          borderWidth: 1,
          borderColor:
            theme === "light"
              ? colors?.dark.background
              : colors?.light.background,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <Search />
        <Text style={{ color: "gray" }}>Search</Text>
      </Pressable>
      <Suspense fallback={<ThemedText>0 0 0</ThemedText>}>
        <ExploreData />
      </Suspense>
    </ThemedView>
  );
}

function ExploreData() {
  const { data: moodsAndGenreData, isLoading } = useSWR(
    "moodsAndGenre",
    getMoodsAndGenre
  );
  if (isLoading) {
    return <StatusScreen message="Loading. . . " />;
  }
  if (!moodsAndGenreData) {
    return <StatusScreen message="failed to fetch data" />;
  }
  return (
    <ThemedScrollView>
      {moodsAndGenreData?.map((data, index) => {
        return (
          <VeritcalScroll key={index} data={data?.data} title={data?.title} />
        );
      })}
    </ThemedScrollView>
  );
}

function MoodsAndgenreItem(data: MoodsAndgenreItemProps & { index: number }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/explore/moodsandgenre/${data?.params}`)}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        height: 52,
        backgroundColor: data?.color,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: data.index % 2 === 0 ? 0 : 10,
      }}
    >
      <ThemedText style={{ color: "black" }}>{data?.title}</ThemedText>
    </Pressable>
  );
}

function VeritcalScroll(extractedData: ExtractedMoodsAndGenre) {
  return (
    <FlashList
      data={extractedData.data}
      renderItem={({ item, index }) => (
        <MoodsAndgenreItem
          browseId={item?.browseId}
          params={item?.params}
          title={item?.title}
          color={item?.color}
          index={index + 1}
        />
      )}
      keyExtractor={(item, index) => item?.browseId + item?.params + index}
      estimatedItemSize={50}
      numColumns={2}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ThemedText variant="sectionTitle">{extractedData?.title}</ThemedText>
      }
    />
  );
}
