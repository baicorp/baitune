import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

export default function StatusScreen({ message }: { message: string }) {
  return (
    <ThemedView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>{message}</ThemedText>
    </ThemedView>
  );
}
