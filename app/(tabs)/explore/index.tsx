import React, { Suspense } from "react";
import { StatusScreen, ThemedText, ThemedView } from "@/components/shared";
import { useRouter } from "expo-router";
import useSWR from "swr";
import { search } from "@/fetch-data/data";
import { Pressable, Text, View } from "react-native";
import { Search } from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";

export default function Explore() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ThemedView>
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
  const { data: searchData, isLoading } = useSWR("circles", search);
  if (isLoading) {
    return <StatusScreen message="Loading. . . " />;
  }
  if (!searchData) {
    return <StatusScreen message="failed to fetch data" />;
  }
  return <ThemedText>hello</ThemedText>;
}
