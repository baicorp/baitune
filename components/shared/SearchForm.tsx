import React, { useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Search } from "../svg";

export default function SearchForm() {
  const [query, setQuery] = useState("");

  const handleSumbit = () => {
    console.log("submitted search form : ", query);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      <Search />
      <TextInput
        placeholder="search"
        style={{
          color: "white",
        }}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSumbit}
        placeholderTextColor={"gray"}
      />
    </KeyboardAvoidingView>
  );
}
