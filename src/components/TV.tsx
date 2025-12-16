import YouTube, { type YouTubeEvent, type YouTubeProps } from "react-youtube";
import type { Channel } from "../data/channels";

export default function TV({
  power,
  channel,
  showStatic,
}: {
  power: boolean;
  channel: Channel;
  showStatic: boolean;
}) {
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1, // autoplay usually requires mute; user can unmute
      listType: "playlist",
      list: channel.playlistId,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
  };

  // Keep trying to jump to a playable video (useful when many videos are embed-disabled)
  const jumpToPlayableRandom = (player: any, tries = 0) => {
    const MAX_TRIES = 30;

    try {
      const list: string[] | null = player.getPlaylist?.();
      if (!list || list.length === 0) {
        // playlist sometimes loads slightly later
        if (tries < MAX_TRIES) setTimeout(() => jumpToPlayableRandom(player, tries + 1), 250);
        return;
      }

      const randomIndex = Math.floor(Math.random() * list.length);
      player.playVideoAt(randomIndex);
    } catch {
      // ignore
    }

    // If the chosen one errors too, onError will call this again.
    // But we also retry a few times in case playlist info loads late.
    if (tries < 2) setTimeout(() => jumpToPlayableRandom(player, tries + 1), 250);
  };

  const handleReady = (e: YouTubeEvent<any>) => {
    // Start at a random video
    jumpToPlayableRandom(e.target);
  };

  const handleEnd = (e: YouTubeEvent<any>) => {
    // When finished, jump to another random video
    jumpToPlayableRandom(e.target);
  };

  const handleError = (e: YouTubeEvent<number>) => {
    // Common YouTube error codes:
    // 100 = video removed / not found
    // 101 / 150 = embedding disabled (“Playback on other websites…”)
    const code = e.data;

    if (code === 100 || code === 101 || code === 150) {
      // Try multiple random picks until we hit an embeddable one
      const player = e.target;
      let tries = 0;
      const MAX_TRIES = 25;

      const tryNext = () => {
        tries += 1;
        if (tries > MAX_TRIES) {
          // If almost everything is blocked, stop looping forever
          // (User can change channel or open playlist on YouTube manually)
          return;
        }
        jumpToPlayableRandom(player, 0);
        setTimeout(tryNext, 400);
      };

      tryNext();
    }
  };

  return (
    <div className="flex-1 rounded-3xl bg-zinc-900 p-3 shadow-2xl">
      <div className="rounded-2xl bg-zinc-950 p-3">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
          {!power ? (
            <div className="absolute inset-0 grid place-items-center text-zinc-400">
              <div className="text-center">
                <div className="text-lg font-semibold">TV OFF</div>
                <div className="text-xs text-zinc-500">Press POWER</div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              <YouTube
                key={channel.playlistId} // important: reload when channel changes
                opts={opts}
                onReady={handleReady}
                onEnd={handleEnd}
                onError={handleError}
                className="h-full w-full"
                iframeClassName="h-full w-full"
              />
            </div>
          )}

          {/* CRT overlays */}
          <div className="pointer-events-none absolute inset-0 opacity-10 scanlines" />
          {showStatic && <div className="pointer-events-none absolute inset-0 static-flash" />}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.65)" }}
          />
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-100">{channel.name}</div>
            {channel.note && <div className="truncate text-xs text-zinc-500">{channel.note}</div>}
          </div>

          <div className="shrink-0 rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
            90s • INDIA
          </div>
        </div>
      </div>
    </div>
  );
}
