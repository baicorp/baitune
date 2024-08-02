import React, { useEffect, useState } from "react";
import { DynamicRenderComponent, ThemedScrollView } from "@/components/shared";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { ArrowBack, Search } from "@/components/svg";
import { getSearchSuggestion } from "@/fetch-data/data";
import useDebounce from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/color";

export default function searchSuggestion() {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query);
  const [suggestionData, setSuggestionData] = useState([]);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    async function getSearchSuggestionData() {
      const data = await getSearchSuggestion(debouncedValue);
      setSuggestionData(data);
    }
    getSearchSuggestionData();
  }, [debouncedValue]);

  const handleSumbit = () => {
    router.push(`explore/search/${query}`);
  };

  return (
    <ThemedScrollView>
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            paddingVertical: 7,
            flexGrow: 1,
          }}
        >
          <Search />
          <Pressable style={{}}>
            <TextInput
              placeholder="search"
              style={{
                color: theme === "light" ? "#000" : "#fff",
              }}
              autoFocus
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSumbit}
              placeholderTextColor={"gray"}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </View>
      <View style={{ gap: 14 }}>
        {suggestionData?.map((suggestion: any, index: any) => {
          return (
            <DynamicRenderComponent
              key={index}
              componentType={suggestion?.type}
              props={suggestion}
            />
          );
        })}
      </View>
    </ThemedScrollView>
  );
}
