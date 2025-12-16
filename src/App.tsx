import { useEffect, useMemo, useState } from "react";
import TV from "./components/TV";
import Remote from "./components/Remote";
import { channels90sIndia } from "./data/channels";

function clampIndex(i: number, n: number) {
  return ((i % n) + n) % n;
}

export default function App() {
  const [power, setPower] = useState(true);
  const [idx, setIdx] = useState(0);
  const [showStatic, setShowStatic] = useState(false);

  const channel = useMemo(() => channels90sIndia[idx], [idx]);

  // Read hash like #ads
  useEffect(() => {
    const h = window.location.hash.replace("#", "").trim();
    if (!h) return;
    const found = channels90sIndia.findIndex((c) => c.id === h);
    if (found >= 0) setIdx(found);
  }, []);

  // Update hash + static flash
  useEffect(() => {
    window.location.hash = channel.id;
    setShowStatic(true);
    const t = setTimeout(() => setShowStatic(false), 300);
    return () => clearTimeout(t);
  }, [channel.id]);

  const next = () => setIdx((i) => clampIndex(i + 1, channels90sIndia.length));
  const prev = () => setIdx((i) => clampIndex(i - 1, channels90sIndia.length));

  // Keyboard: ← →, and P for power
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key.toLowerCase() === "p") setPower((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">India Retro TV</div>
            <div className="text-xs text-zinc-500">90s edition • channel surfing via YouTube playlists</div>
          </div>
          <div className="text-xs text-zinc-500 hidden md:block">
            Tip: keyboard ← / → to change channel • P = power
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <TV power={power} channel={channel} showStatic={showStatic && power} />
          <Remote
            power={power}
            onPower={() => setPower((p) => !p)}
            onNext={next}
            onPrev={prev}
            channelLabel={channel.name}
          />
        </div>

        <div className="mt-6 text-xs text-zinc-600">
          Replace playlist IDs in <span className="text-zinc-300">src/data/channels.ts</span>.
        </div>
      </div>
    </div>
  );
}
