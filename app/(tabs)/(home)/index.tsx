import React from "react";
import { ScrollView, View } from "react-native";
import {
  DynamicRenderComponent,
  StatusScreen,
  ThemedSafeAreaView,
  ThemedText,
} from "@/components/shared";
import useSWR from "swr";
import {
  AlbumItem,
  ChannelItem,
  SongItem,
  PlaylistItem,
} from "@/components/cardItem";
import {
  albumBrowseId,
  channelBrowseId,
  playlistBrowseId,
} from "@/constants/dummy";
import { getHome } from "@/fetch-data/data";

export default function Explore() {
  const { data: homeData, isLoading, error } = useSWR("FEmusic_home", getHome);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }
  if (!homeData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  return (
    <ThemedSafeAreaView>
      <ScrollView>
        {homeData?.map((data: any, index: number) => {
          if (data === undefined) return null;
          return (
            <View key={index}>
              <ThemedText variant="sectionTitle">
                {data?.headerTitle}
              </ThemedText>
              <View style={{ rowGap: 8 }}>
                {data?.contents?.map((content: any, index: number) => {
                  return (
                    <DynamicRenderComponent
                      key={index}
                      componentType={content?.type}
                      props={content}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
