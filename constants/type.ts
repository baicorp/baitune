type BaseSong = {
  videoId: string;
  title: string;
  explicit: boolean;
  artist: string;
  duration?: string;
  isPlaying?: boolean;
};

export interface AlbumVariantProps extends BaseSong {
  variant: "album";
  index: number;
}

export interface PlaylistVariantProps extends BaseSong {
  variant: "playlist";
  thumbnail: string;
}

export type SongItemProps = AlbumVariantProps | PlaylistVariantProps;

export type BaseAlbumAndPlaylistData = {
  title: string;
  subtitle: string;
  thumbnail: string;
  stat: string;
  description: string;
};

export interface ExtractedAlbumData extends BaseAlbumAndPlaylistData {
  artists: { name: string; browseId: string };
  contents: AlbumVariantProps[];
}

export interface ExtractedPlaylistData extends BaseAlbumAndPlaylistData {
  contents: PlaylistVariantProps[];
}

interface BaseCardItem {
  browseId: string;
  thumbnail: string;
  variant?: "default" | "big";
}

export interface PlaylistItemProps extends BaseCardItem {
  title: string;
  description: string;
  isPlaying?: boolean;
}

export interface AlbumItemProps extends BaseCardItem {
  title: string;
  description: string;
  explicit?: boolean;
  isPlaying?: boolean;
}

export interface ChannelItemProps extends BaseCardItem {
  channelName: string;
  subscribers: string;
}

export type MoodsAndgenreItemProps = {
  browseId: string;
  params: string;
  title: string;
  color: string;
};

export type ExtractedMoodsAndGenre = {
  title: string;
  data: MoodsAndgenreItemProps[];
};

export type ContentType =
  | "channel"
  | "song"
  | "album"
  | "playlist"
  | null
  | "suggestion";
