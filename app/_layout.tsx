import { Player } from "@/components";
import { colors } from "@/constants/color";
import ThemeProvider, { useTheme } from "@/hooks/useTheme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <RootNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function RootNavigation() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="channel/[browseId]"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="playlist/[browseId]"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="album/[browseId]"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
      {/* <Player /> */}
    </>
  );
}

function ThemedStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar
      style="auto"
      // backgroundColor={
      //   theme === "light" ? colors.light.background : colors.dark.background
      // }
      backgroundColor="transparent"
    />
  );
}
