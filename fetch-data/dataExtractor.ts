import {
  ContentType,
  ExtractedAlbumData,
  ExtractedMoodsAndGenre,
  ExtractedPlaylistData,
} from "@/constants/type";

const timeRegex =
  /^(0?\d|1\d|2[0-3]):([0-5]?\d):([0-5]?\d)$|^(0?\d|1\d|2[0-3]):([0-5]?\d)$|^(0?\d|1\d|2[0-3])$/;

function contentType(id: string): ContentType {
  if (!id) return null;
  if (id?.startsWith("MPREb_")) {
    return "album";
  } else if (
    id?.startsWith("VLRDCLAK5uy_") ||
    id?.startsWith("VLPL") ||
    id?.startsWith("VLRDA")
  ) {
    return "playlist";
  } else if (id?.startsWith("UC") && id?.length === 24) {
    return "channel";
  } else if (id === "suggestion") {
    return "suggestion";
  } else {
    return "song";
  }
}

export function extractPlaylistData(
  playlistObject: any
): ExtractedPlaylistData {
  const playlist =
    playlistObject?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicResponsiveHeaderRenderer;
  let contents =
    playlistObject?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents
      ?.sectionListRenderer?.contents[0]?.musicPlaylistShelfRenderer?.contents;
  return {
    title: playlist?.title?.runs[0]?.text,
    subtitle: playlist?.subtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    thumbnail:
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[3]
        ?.url ||
      playlist?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]
        ?.url,
    stat: playlist?.secondSubtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    description:
      playlist?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
    contents: contents?.map((data: any) => {
      const dataItem = data?.musicResponsiveListItemRenderer;
      return {
        videoId: dataItem?.playlistItemData?.videoId,
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        artist: dataItem?.flexColumns
          ?.map((flexColumn: any) =>
            flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
              (run: any) => {
                if (
                  !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                    "UC"
                  )
                )
                  return null;
                return run?.text?.trim();
              }
            )
          )
          ?.flat(100)
          ?.filter((data: any) => data !== null)
          .toString(),
        thumbnail:
          dataItem?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]
            ?.url,
        explicit: dataItem?.badges ? true : false,
        duration:
          dataItem?.fixedColumns[0]?.musicResponsiveListItemFixedColumnRenderer
            ?.text?.runs[0]?.text,
      };
    }),
  };
}

export function extractAlbumData(albumDataObject: any): ExtractedAlbumData {
  const album =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicResponsiveHeaderRenderer;
  const contents =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents
      ?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.contents;
  return {
    title: album?.title?.runs[0]?.text,
    subtitle: album?.subtitle?.runs?.map((data: any) => data?.text)?.join(""),
    thumbnail:
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[3]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]?.url,
    stat: album?.secondSubtitle?.runs?.map((data: any) => data?.text)?.join(""),
    description:
      album?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
    artists: album?.straplineTextOne?.runs
      ?.map((run: any) => {
        if (run?.navigationEndpoint?.browseEndpoint) {
          return {
            name: run?.text,
            browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
          };
        }
        return null;
      })
      ?.filter((data: any) => data !== null)[0],
    contents: contents?.map((data: any) => {
      const dataItem = data?.musicResponsiveListItemRenderer;
      return {
        index: dataItem?.index?.runs[0]?.text,
        videoId: dataItem?.playlistItemData?.videoId,
        thumbnail:
          album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]
            ?.url?.url,
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        artist:
          dataItem?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs
            ?.map((run: any) => {
              if (
                run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                  "UC"
                )
              ) {
                return run?.text?.trim();
              }
              return "null";
            })
            ?.flat(100)
            ?.filter((data: any) => data?.trim() !== "null")
            ?.toString()
            ?.replaceAll(",", " & ") ||
          album?.straplineTextOne?.runs
            ?.map((run: any) => {
              if (
                run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                  "UC"
                )
              ) {
                return run?.text?.trim();
              }
              return "null";
            })
            ?.flat(100)
            ?.filter((data: any) => data?.trim() !== "null")
            ?.toString()
            .replaceAll(",", " & "),
        plays:
          dataItem?.flexColumns[
            dataItem?.flexColumns?.length - 1
          ]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
            (run: any) => run?.text
          )[0] || null,
        explicit: dataItem?.badges ? true : false,
        duration:
          dataItem?.fixedColumns[0]?.musicResponsiveListItemFixedColumnRenderer
            ?.text?.runs[0]?.text,
      };
    }),
  };
}

export function extractSearchData(searchDataObject: any) {
  let contents: any[];
  contents =
    searchDataObject?.contents?.tabbedSearchResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;
  return contents
    .map((content: any) => {
      // get top result
      if (content?.musicCardShelfRenderer) {
        return {
          title:
            content?.musicCardShelfRenderer?.header
              ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
          data: [
            {
              // data for albums, playlists, singles list
              title: content?.musicCardShelfRenderer?.title?.runs[0]?.text,
              // data for channels list
              channelName:
                content?.musicCardShelfRenderer?.title?.runs[0]?.text,
              // data for channels list
              subscribers: content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((data: any) => data?.text?.trim())
                .toString()
                .replaceAll(",", " "),
              // data for albums, playlists, singles list
              description: content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((data: any) => data?.text?.trim())
                .toString()
                .replaceAll(",", ""),
              thumbnail:
                content?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                content?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
              artist: content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((run: any) => {
                  if (
                    run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                      "UC"
                    )
                  ) {
                    return run?.text?.trim();
                  }
                  return "null";
                })
                ?.flat(100)
                ?.filter((data: any) => data?.trim() !== "null")
                ?.toString(),
              // plays:
              //   content?.musicCardShelfRenderer?.subtitle?.runs
              //     ?.map((run: any) => {
              //       if (!run?.text?.endsWith("plays")) return null;
              //       return run?.text?.trim();
              //     })
              //     ?.filter((data: any) => data !== null)[0] || null,
              // views:
              //   content?.musicCardShelfRenderer?.subtitle?.runs
              //     ?.map((run: any) => {
              //       if (!run?.text?.endsWith("views")) return null;
              //       return run?.text?.trim();
              //     })
              //     ?.filter((data: any) => data !== null)[0] || null,
              duration:
                content?.musicCardShelfRenderer?.subtitle?.runs
                  ?.map((run: any) => {
                    if (!timeRegex.test(run?.text)) return null;
                    return run?.text;
                  })
                  ?.filter((data: any) => data !== null)[0] || null,
              videoId:
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.watchEndpoint?.videoId,
              browseId:
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.browseEndpoint?.browseId,
              explicit: content?.musicCardShelfRenderer?.badges
                ? true
                : false || content?.musicCardShelfRenderer?.subtitleBadges
                ? true
                : false,
              type: contentType(
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.watchEndpoint?.videoId ||
                  content?.musicCardShelfRenderer?.title?.runs[0]
                    ?.navigationEndpoint?.browseEndpoint?.browseId
              ),
            },
          ],
        };
      }
      // get related search result
      if (content?.musicShelfRenderer) {
        const contentTitle = content?.musicShelfRenderer?.title?.runs[0]?.text;
        if (
          contentTitle === "Podcasts" ||
          contentTitle === "Episodes" ||
          contentTitle === "Profiles" ||
          contentTitle === "Last episodes"
        ) {
          return {
            title: "",
            data: [],
          };
        }

        return {
          title: contentTitle,
          data: content?.musicShelfRenderer?.contents?.map((content: any) => {
            const subtitle =
              content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => run?.text?.trim()
                  )
                )
                ?.flat(100)
                ?.slice(1)
                ?.toString()
                ?.replaceAll(",", " ");
            return {
              title:
                content?.musicResponsiveListItemRenderer?.flexColumns[0]
                  .musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                  ?.text,
              // data for channels list
              channelName:
                content?.musicResponsiveListItemRenderer?.flexColumns[0]
                  .musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                  ?.text,
              // data for channels list
              subscribers: content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => run?.text?.trim()
                  )
                )
                ?.flat(100)
                ?.slice(1)
                ?.toString()
                ?.replaceAll(",", " "),
              thumbnail:
                content?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                content?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
              description: subtitle,
              artist: content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => {
                      if (
                        run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                          "UC"
                        )
                      ) {
                        return run?.text?.trim();
                      }
                      return "null";
                    }
                  )
                )
                ?.flat(100)
                ?.filter((data: any) => data?.trim() !== "null")
                ?.toString(),
              plays:
                content?.musicResponsiveListItemRenderer?.flexColumns
                  ?.map((flexColumn: any) =>
                    flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (run: any) => {
                        if (!run?.text?.endsWith("plays")) return null;
                        return run?.text;
                      }
                    )
                  )
                  ?.flat(100)
                  ?.filter((data: any) => data !== null)[0] || null,
              // views:
              //   content?.musicResponsiveListItemRenderer?.flexColumns
              //     ?.map((flexColumn: any) =>
              //       flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
              //         (run: any) => {
              //           if (!run?.text?.endsWith("views")) return null;
              //           return run?.text;
              //         }
              //       )
              //     )
              //     ?.flat(100)
              //     ?.filter((data: any) => data !== null)[0] || null,
              duration:
                content?.musicResponsiveListItemRenderer?.flexColumns
                  ?.map((flexColumn: any) =>
                    flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                      (run: any) => {
                        if (!timeRegex.test(run?.text)) return null;
                        return run?.text;
                      }
                    )
                  )
                  ?.flat(100)
                  ?.filter((data: any) => data !== null)[0] || null,
              videoId:
                content?.musicResponsiveListItemRenderer?.overlay
                  ?.musicItemThumbnailOverlayRenderer?.content
                  ?.musicPlayButtonRenderer?.playNavigationEndpoint
                  ?.watchEndpoint?.videoId,
              browseId:
                content?.musicResponsiveListItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId,
              explicit: content?.musicResponsiveListItemRenderer?.badges
                ? true
                : false ||
                  content?.musicResponsiveListItemRenderer?.subtitleBadges
                ? true
                : false,
              type: contentType(
                content?.musicResponsiveListItemRenderer?.overlay
                  ?.musicItemThumbnailOverlayRenderer?.content
                  ?.musicPlayButtonRenderer?.playNavigationEndpoint
                  ?.watchEndpoint?.videoId ||
                  content?.musicResponsiveListItemRenderer?.navigationEndpoint
                    ?.browseEndpoint?.browseId
              ),
            };
          }),
        };
      }
      return {
        title: "",
        data: [],
      };
    })
    ?.filter((item: any) => item?.data?.length !== 0);
}

export function extractSearchSuggestionData(searchSuggestionObject: any) {
  const contents = searchSuggestionObject?.contents?.map(
    (content: any) => content?.searchSuggestionsSectionRenderer?.contents
  );

  return contents
    ?.map((content: any) => {
      return content?.map((data: any) => {
        if (data?.searchSuggestionRenderer) {
          return {
            // data input query
            input: data?.searchSuggestionRenderer?.suggestion?.runs
              ?.map((run: any) => run?.text)
              .toString()
              .replaceAll(",", " "),
            query:
              data?.searchSuggestionRenderer?.navigationEndpoint?.searchEndpoint
                ?.query,
            type: "suggestion",
            // polyfill data for data consistency
            browseId: "",
            videoId: "",
            title: "",
            channelName: "",
            subscribers: "",
            explicit: false,
            artist: "",
            thumbnail: "",
            description: "",
          };
        }
        if (data?.musicResponsiveListItemRenderer) {
          return {
            // data for song, album, channel, playlist, or single
            browseId:
              data?.musicResponsiveListItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId || "",
            videoId:
              data?.musicResponsiveListItemRenderer?.navigationEndpoint
                ?.watchEndpoint?.videoId || "",
            title:
              data?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.text,
            channelName:
              data?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.text,
            subscribers: "",
            description:
              data?.musicResponsiveListItemRenderer?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs
                ?.map((run: any) => run?.text)
                ?.toString()
                ?.replaceAll(",", " ") || "",
            explicit: data?.musicResponsiveListItemRenderer?.badges
              ? true
              : false || data?.musicResponsiveListItemRenderer?.subtitleBadges
              ? true
              : false,
            artist:
              data?.musicResponsiveListItemRenderer?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                (run: any) => run?.text
              )
                ? data?.musicResponsiveListItemRenderer?.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => run?.text
                  )[2]
                : "",
            thumbnail:
              data?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            type: contentType(
              data?.musicResponsiveListItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId ||
                data?.musicResponsiveListItemRenderer?.navigationEndpoint
                  ?.watchEndpoint?.videoId ||
                ""
            ),
            input: "",
            query: "",
          };
        }
      });
    })
    ?.flat(10);
}

export function extractHomeData(data: any) {
  const contents =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents;
  return contents?.map((data: any) => {
    const contentTypeTitle =
      data?.musicCarouselShelfRenderer?.header
        ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text;
    return {
      headerTitle: contentTypeTitle,
      contents: data?.musicCarouselShelfRenderer?.contents?.map((data: any) => {
        // quick songs data
        if (data?.musicResponsiveListItemRenderer) {
          return {
            title:
              data?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.text,
            thumbnail:
              data?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
              data?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            artist: data?.musicResponsiveListItemRenderer?.flexColumns
              ?.map((data: any) =>
                data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                  (run: any) => {
                    if (
                      run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                        "UC"
                      )
                    ) {
                      return run?.text?.trim();
                    }
                    return "null";
                  }
                )
              )
              ?.flat(100)
              ?.filter((data: any) => data?.trim() !== "null")
              ?.toString(),
            videoId:
              data?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId,
            explicit: data?.musicResponsiveListItemRenderer.subtitleBadges
              ? true
              : false || data?.musicResponsiveListItemRenderer.badges
              ? true
              : false,
            type: contentType(
              data?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId
            ),
          };
        }
        if (data?.musicTwoRowItemRenderer) {
          return {
            title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
            description: data?.musicTwoRowItemRenderer?.subtitle?.runs
              ?.map((data: any) => data?.text?.trim())
              .flat(100)
              ?.filter((data: any) => data?.trim() !== ","),
            thumbnail:
              data?.musicTwoRowItemRenderer?.thumbnailRenderer
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
              data?.musicTwoRowItemRenderer?.thumbnailRenderer
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            videoId:
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.watchEndpoint
                ?.videoId,
            browseId:
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.browseEndpoint
                ?.browseId,
            explicit: data?.musicTwoRowItemRenderer?.subtitleBadges
              ? true
              : false || data?.musicTwoRowItemRenderer?.badges
              ? true
              : false,
            type: contentType(
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.watchEndpoint
                ?.videoId ||
                data?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId
            ),
          };
        }
      }),
    };
  });
}

export function extractMoodsAndGenre(
  moodsAndGenreObject: any
): ExtractedMoodsAndGenre[] {
  function numberToHexColor(colorNumber: number): string {
    // Extract the RGB values
    const red = (colorNumber >> 16) & 255;
    const green = (colorNumber >> 8) & 255;
    const blue = colorNumber & 255;

    // Convert to hex and pad with zeros
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Combine and return the hex color
    return `#${redHex}${greenHex}${blueHex}`;
  }
  const contents =
    moodsAndGenreObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;
  return contents?.map((content: any) => {
    return {
      title:
        content?.gridRenderer?.header?.gridHeaderRenderer?.title?.runs[0]?.text,
      data: content?.gridRenderer?.items?.map((item: any) => {
        return {
          browseId:
            item?.musicNavigationButtonRenderer?.clickCommand?.browseEndpoint
              ?.browseId,
          params:
            item?.musicNavigationButtonRenderer?.clickCommand?.browseEndpoint
              ?.params,
          title: item?.musicNavigationButtonRenderer?.buttonText?.runs[0]?.text,
          color: numberToHexColor(
            item?.musicNavigationButtonRenderer?.solid?.leftStripeColor
          ),
        };
      }),
    };
  });
}

export function extractNextData(nextData: any) {
  nextData =
    nextData?.contents?.singleColumnMusicWatchNextResultsRenderer
      ?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents;
  //remove first element of array because it's the same as the current played song
  return nextData?.slice(1)?.map((next: any) => {
    next = next?.playlistPanelVideoRenderer;
    return {
      videoId: next?.navigationEndpoint?.watchEndpoint?.videoId,
      title: next?.title?.runs[0].text,
      artist: next?.longBylineText?.runs
        ?.filter(
          (data: any) =>
            data?.navigationEndpoint?.browseEndpoint
              ?.browseEndpointContextSupportedConfigs
              ?.browseEndpointContextMusicConfig?.pageType ===
            "MUSIC_PAGE_TYPE_ARTIST"
        )
        .map((run: any) => {
          if (
            run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith("UC")
          ) {
            return run?.text?.trim();
          }
          return "null";
        })
        ?.flat(100)
        ?.filter((data: any) => data?.trim() !== "null")
        ?.toString(),
      duration: next?.lengthText?.runs[0]?.text,
      thumbnail:
        next?.thumbnail?.thumbnails[1]?.url ||
        next?.thumbnail?.thumbnails[0]?.url,
      playlistId: next?.navigationEndpoint?.watchEndpoint?.playlistId,
      explicit: next?.badges ? true : false,
    };
  });
}

export function extractVideoData(videoDataObject: any) {
  return {
    videoId: videoDataObject?.videoDetails?.videoId,
    title: videoDataObject?.videoDetails?.title,
    browseId: videoDataObject?.videoDetails?.channelId,
    channelName: videoDataObject?.videoDetails?.author,
    thumbnail: videoDataObject?.videoDetails?.thumbnail?.thumbnails[1]?.url,
    url:
      videoDataObject.streamingData?.adaptiveFormats?.filter((data: any) => {
        return data?.itag === 251 || data?.itag === 140;
      })[0]?.url || null,
  };
}

export function extractChannelData(channelObject: any) {
  return {
    header: {
      title:
        channelObject?.header?.musicImmersiveHeaderRenderer?.title?.runs[0]
          ?.text ||
        channelObject?.header?.musicVisualHeaderRenderer?.title?.runs[0]?.text,
      subtitle:
        channelObject?.header?.musicVisualHeaderRenderer?.subscriptionButton
          ?.longSubscriberCountText?.runs[0]?.text,
      description:
        channelObject?.header?.musicImmersiveHeaderRenderer?.description
          ?.runs[0]?.text,
      thumbnail:
        channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
          channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
            ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 2
        ]?.url ||
        channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
          channelObject?.header?.musicVisualHeaderRenderer?.thumbnail
            ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 3
        ]?.url,
      avatar:
        channelObject?.header?.musicVisualHeaderRenderer?.foregroundThumbnail
          ?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]?.url,
    },
    contents:
      channelObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents
        ?.map((data: any) => {
          // extract songs list data
          if (data?.musicShelfRenderer) {
            return {
              title: data?.musicShelfRenderer?.title?.runs[0]?.text,
              data: data?.musicShelfRenderer?.contents?.map((data: any) => {
                return {
                  title:
                    data?.musicResponsiveListItemRenderer?.flexColumns[0]
                      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                      ?.text,
                  thumbnail:
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                    data?.musicResponsiveListItemRenderer?.thumbnail
                      ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                  // channelName: "",
                  // subcribers: "",
                  // description: "",
                  // browseId: "",
                  artist: data?.musicResponsiveListItemRenderer?.flexColumns
                    ?.map((data: any) =>
                      data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                        (data: any) => {
                          if (
                            data.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                              "UC"
                            )
                          ) {
                            return data?.text?.trim();
                          }
                          return "null";
                        }
                      )
                    )
                    ?.flat(100)
                    ?.filter((data: any) => data?.trim() !== "null")
                    ?.toString(),
                  videoId:
                    data?.musicResponsiveListItemRenderer?.overlay
                      ?.musicItemThumbnailOverlayRenderer?.content
                      ?.musicPlayButtonRenderer?.playNavigationEndpoint
                      ?.watchEndpoint?.videoId,
                  explicit: data?.musicResponsiveListItemRenderer?.badges
                    ? true
                    : false,
                  type: contentType(
                    data?.musicResponsiveListItemRenderer?.overlay
                      ?.musicItemThumbnailOverlayRenderer?.content
                      ?.musicPlayButtonRenderer?.playNavigationEndpoint
                      ?.watchEndpoint?.videoId
                  ),
                };
              }),
            };
          }
          // extract videos, albums, singles, playlists, channels list data
          if (data?.musicCarouselShelfRenderer) {
            return {
              title:
                data?.musicCarouselShelfRenderer?.header
                  ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
              data: data?.musicCarouselShelfRenderer?.contents?.map(
                (data: any) => {
                  return {
                    // data for albums, playlists, singles list
                    title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
                    // data for channels list
                    channelName:
                      data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
                    // data for channels list
                    subscribers: data?.musicTwoRowItemRenderer?.subtitle?.runs
                      ?.map((data: any) => data?.text?.trim())
                      .flat(100)
                      ?.filter((data: any) => data.trim() !== ",")
                      .toString(),
                    // data for albums, playlists, singles list
                    description: data?.musicTwoRowItemRenderer?.subtitle?.runs
                      ?.map((data: any) => data?.text?.trim())
                      .toString()
                      .replaceAll(",", ""),
                    // data for all type of list
                    thumbnail:
                      data?.musicTwoRowItemRenderer?.thumbnailRenderer
                        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
                        ?.url ||
                      data?.musicTwoRowItemRenderer?.thumbnailRenderer
                        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                    // data for videos list
                    artist: data?.musicTwoRowItemRenderer?.subtitle?.runs
                      ?.map((data: any) => {
                        if (
                          data.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                            "UC"
                          )
                        ) {
                          return data?.text?.trim();
                        }
                        return "null";
                      })
                      ?.flat(100)
                      ?.filter((data: any) => data?.trim() !== "null")
                      ?.toString(),
                    // data for videos list
                    videoId:
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.watchEndpoint?.videoId,
                    browseId:
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.browseEndpoint?.browseId,
                    // data for singles and albums list
                    explicit: data?.musicTwoRowItemRenderer?.subtitleBadges
                      ? true
                      : false,
                    type: contentType(
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.browseEndpoint?.browseId ||
                        data?.musicTwoRowItemRenderer?.navigationEndpoint
                          ?.watchEndpoint?.videoId
                    ),
                  };
                }
              ),
              // data: [
              //   { id: 1, title: "asus" },
              //   { id: 2, title: "lenovo" },
              //   { id: 3, title: "advan" },
              // ],
            };
          }
        })
        ?.filter((item: any) => item !== undefined),
  };
}
