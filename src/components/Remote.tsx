export default function Remote({
  power,
  onPower,
  onNext,
  onPrev,
  channelLabel,
}: {
  power: boolean;
  onPower: () => void;
  onNext: () => void;
  onPrev: () => void;
  channelLabel: string;
}) {
  return (
    <div className="w-full md:w-[280px] rounded-3xl bg-zinc-900 p-4 shadow-2xl">
      <div className="text-xs text-zinc-400">REMOTE</div>
      <div className="mt-1 text-sm font-semibold text-zinc-100 truncate">{channelLabel}</div>

      <button
        className={`mt-4 w-full rounded-2xl py-2 font-semibold transition
          ${power ? "bg-emerald-600/90 hover:bg-emerald-600" : "bg-zinc-800 hover:bg-zinc-700"}`}
        onClick={onPower}
      >
        POWER
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="rounded-2xl bg-zinc-800 py-2 hover:bg-zinc-700" onClick={onPrev}>
          CH ▼
        </button>
        <button className="rounded-2xl bg-zinc-800 py-2 hover:bg-zinc-700" onClick={onNext}>
          CH ▲
        </button>
      </div>

      <div className="mt-4 text-xs text-zinc-500 leading-relaxed">
        Share a channel link like:
        <div className="mt-1 rounded-xl bg-zinc-950 px-3 py-2 text-zinc-300">
          yoursite.com/#ads
        </div>
      </div>

      <div className="mt-4 text-[11px] text-zinc-500">
        Note: autoplay may start muted. Unmute in the player.
      </div>
    </div>
  );
}
