import { Pressable, View } from "react-native";
import { Search } from "../svg";
import ThemedText from "../shared/ThemedText";
import { useRouter } from "expo-router";
export default function QuerySuggestionItem({ query }: { query: string }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`explore/search/${query}`)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Search />
      </View>
      <ThemedText variant="title" style={{ color: "gray" }}>
        {query}
      </ThemedText>
    </Pressable>
  );
}
