import React from "react";
import {
  DynamicRenderComponent,
  StatusScreen,
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from "@/components/shared";
import useSWR from "swr";
import { search } from "@/fetch-data/data";
import { Pressable, SectionList, StyleSheet, View } from "react-native";
import { ItemSeparator } from "@/components/flashlist";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";
import { ArrowBack, Search } from "@/components/svg";

export default function SearchResult() {
  const { searchResultQuery } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const {
    data: searchData,
    isLoading,
    error,
  } = useSWR(searchResultQuery, search);

  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }
  if (!searchData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  return (
    <SectionList
      style={{
        backgroundColor:
          theme === "light" ? colors.light.background : colors.dark.background,
      }}
      keyExtractor={(item, index) => item + index}
      sections={searchData}
      renderItem={({ item }) => (
        <DynamicRenderComponent componentType={item?.type} props={item} />
      )}
      ItemSeparatorComponent={() => <ItemSeparator />}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText variant="sectionTitle">{title}</ThemedText>
      )}
      ListHeaderComponent={() => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable onPress={router.back}>
            <ArrowBack
              fill={
                theme === "light"
                  ? colors.dark.background
                  : colors.light.background
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/explore/search");
            }}
            style={{
              flex: 1,
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
            <ThemedText>{searchResultQuery}</ThemedText>
          </Pressable>
        </View>
      )}
    />
  );
}

const style = StyleSheet.create({});
