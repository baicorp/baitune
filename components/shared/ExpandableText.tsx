import { useState } from "react";
import ThemedText from "./ThemedText";

export default function ExpandableText({
  description,
  textAlign = "left",
}: {
  description: string;
  textAlign?: "left" | "center";
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <ThemedText
      style={{
        color: "gray",
        textAlign: textAlign === "center" ? "center" : "left",
      }}
      onPress={() => setIsExpanded((prev) => !prev)}
      numberOfLines={isExpanded ? undefined : 3}
    >
      {description}
    </ThemedText>
  );
}
