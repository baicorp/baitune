import { ContentType } from "@/constants/type";
import {
  AlbumItem,
  ChannelItem,
  PlaylistItem,
  QuerySuggestionItem,
  SongItem,
} from "../cardItem";

export default function DynamicRenderComponent({
  componentType,
  variant = "small",
  props,
}: {
  componentType: ContentType;
  variant?: "small" | "big";
  props: any;
}) {
  if (!componentType) return null;
  switch (componentType) {
    case "song":
      return <SongItem variant="playlist" {...props} />;
    case "album":
      return (
        <AlbumItem variant={variant === "big" ? "big" : "default"} {...props} />
      );
    case "channel":
      return (
        <ChannelItem
          variant={variant === "big" ? "big" : "default"}
          {...props}
        />
      );
    case "playlist":
      return (
        <PlaylistItem
          variant={variant === "big" ? "big" : "default"}
          {...props}
        />
      );
    case "suggestion":
      return <QuerySuggestionItem {...props} />;
    default:
      return (
        <PlaylistItem
          variant={variant === "big" ? "big" : "default"}
          {...props}
        />
      );
  }
}
