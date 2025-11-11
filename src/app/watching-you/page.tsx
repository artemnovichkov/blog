import type { Metadata } from "next";
import { WatchingYouVideo } from "./watching-you-video";

export const metadata: Metadata = {
  title: "I'm Watching You",
  description: "Move your cursor and watch what happens...",
};

export default function WatchingYouPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-40 bg-white dark:bg-zinc-900">
      <WatchingYouVideo />
    </div>
  );
}
