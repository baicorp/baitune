import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { getChannel } from "@/fetch-data/data";
import {
  DynamicRenderComponent,
  ExpandableText,
  StatusScreen,
  ThemedScrollView,
  ThemedText,
} from "@/components/shared";
import { Radio, Shuffle } from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { ItemSeparator } from "@/components/flashlist";
import { FlashList } from "@shopify/flash-list";
import { ContentType } from "@/constants/type";

export default function ChannelScreen() {
  const { browseId } = useLocalSearchParams();
  const { data: channelData, isLoading, error } = useSWR(browseId, getChannel);
  if (isLoading) {
    return <StatusScreen message="Loading . . ." />;
  }
  if (!channelData || error) {
    return <StatusScreen message="failed to fetch data" />;
  }

  const ListContent = channelData?.contents?.map((content: any, index: any) => {
    if (
      content?.title.toLowerCase() === "songs" ||
      content?.title.toLowerCase() === "videos"
    ) {
      return (
        <VerticalFlashList
          key={index}
          data={content?.data}
          title={content?.title}
        />
      );
    } else {
      return (
        <HorizontalFlashList
          key={index}
          data={content?.data}
          title={content?.title}
        />
      );
    }
  });

  return (
    <ThemedScrollView>
      <ChannelScreenHeader channelDataHeader={channelData.header} />
      <View style={{ paddingHorizontal: 16 }}>{ListContent}</View>
      <ChannelScreenFooter description={channelData?.header?.description} />
    </ThemedScrollView>
  );
}

function Button({ variant }: { variant: "shuffle" | "radio" }) {
  const { theme } = useTheme();

  const accentShuffleColor =
    theme === "light" ? colors.light.background : colors.dark.background;
  const accentRadioColor =
    theme === "light" ? colors.dark.background : colors.light.background;

  return (
    <TouchableOpacity
      style={{
        // minWidth: "100%",
        backgroundColor:
          variant === "shuffle" ? accentRadioColor : accentShuffleColor,
        borderWidth: variant === "shuffle" ? 1 : 1,
        borderColor:
          variant === "shuffle" ? accentShuffleColor : accentRadioColor,
        borderRadius: 100,
        display: "flex",
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      {variant === "shuffle" ? <Shuffle /> : <Radio />}
      <Text
        style={{
          color: variant === "shuffle" ? accentShuffleColor : accentRadioColor,
        }}
      >
        {variant === "shuffle" ? "Shuffle" : "Radio"}
      </Text>
    </TouchableOpacity>
  );
}

function HorizontalFlashList(content: {
  title: string;
  data: { type: ContentType }[];
}) {
  return (
    <View>
      <ThemedText variant="sectionTitle">{content?.title}</ThemedText>
      <FlashList
        data={content.data}
        renderItem={({ item }) => (
          <DynamicRenderComponent
            componentType={item?.type}
            props={item}
            variant="big"
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        estimatedItemSize={210}
        horizontal
      />
    </View>
  );
}

function VerticalFlashList(content: {
  title: string;
  data: { type: ContentType }[];
}) {
  return (
    <FlashList
      data={content?.data}
      renderItem={({ item }) => (
        <DynamicRenderComponent componentType={item?.type} props={item} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <ThemedText variant="sectionTitle">{content?.title}</ThemedText>
      )}
      estimatedItemSize={52}
    />
  );
}

function LinearGradientLayer() {
  const { theme } = useTheme();
  const TOPCOLOR = theme === "light" ? "rgba(255, 255, 255, 0.2)" : "#0e1111";
  const BOTTTOMCOLOR =
    theme === "light" ? colors.light.background : colors.dark.background;
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[TOPCOLOR, "transparent", "transparent", BOTTTOMCOLOR]}
      style={{
        position: "absolute",
        alignItems: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    />
  );
}

function ChannelScreenHeader({
  channelDataHeader,
}: {
  channelDataHeader: any;
}) {
  return (
    <View style={style.headerContainer}>
      <Image
        source={{
          uri: channelDataHeader.thumbnail,
        }}
        style={style.headerImage}
      />
      <LinearGradientLayer />
      <View style={style.headerSectionContiner}>
        <ThemedText variant="channelTitle" style={style.headerSectionTitle}>
          {channelDataHeader.title}
        </ThemedText>
        <View style={style.buttonContainer}>
          <View style={style.button}>
            <Button variant="shuffle" />
          </View>
          <View style={style.button}>
            <Button variant="radio" />
          </View>
        </View>
      </View>
    </View>
  );
}

function ChannelScreenFooter({ description }: { description: string }) {
  if (!description) return null;
  return (
    <View>
      <ThemedText variant="sectionTitle" style={style.sectionTitle}>
        About
      </ThemedText>
      <View style={style.paddingHorizontal}>
        <ExpandableText description={description} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  // screen style
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    aspectRatio: "1/1",
    opacity: 1,
  },
  headerSectionContiner: {
    position: "absolute",
    right: 16,
    left: 16,
    bottom: 20,
    display: "flex",
    gap: 20,
  },
  headerSectionTitle: { textAlign: "center" },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  button: { flex: 1 },
  // list style
  sectionTitle: { paddingHorizontal: 16 },
  verticalList: { display: "flex", rowGap: 8, paddingHorizontal: 16 },
  HorizontalScrollView: {},
  // global channel screen style
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});
