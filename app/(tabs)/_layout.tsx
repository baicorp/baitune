import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/color";
import {
  HomeFilled,
  HomeOutlined,
  ExploreFilled,
  ExploreOutlined,
  LibraryFilled,
  LibraryOutlined,
} from "@/components/svg";
import { useTheme } from "@/hooks/useTheme";

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          theme === "light"
            ? colors.light.tabIconSelected
            : colors.dark.tabIconSelected,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          backgroundColor:
            theme === "light"
              ? colors.light.background
              : colors.dark.background,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeFilled
                fill={
                  theme === "light"
                    ? colors.light.tabIconSelected
                    : colors.dark.tabIconSelected
                }
              />
            ) : (
              <HomeOutlined fill={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ExploreFilled
                fill={
                  theme === "light"
                    ? colors.light.tabIconSelected
                    : colors.dark.tabIconSelected
                }
              />
            ) : (
              <ExploreOutlined fill={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <LibraryFilled
                fill={
                  theme === "light"
                    ? colors.light.tabIconSelected
                    : colors.dark.tabIconSelected
                }
              />
            ) : (
              <LibraryOutlined fill={color} />
            ),
        }}
      />
    </Tabs>
  );
}
