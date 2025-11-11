import type { Metadata } from "next";
import { WatchingYouVideo } from "./watching-you-video";

export const metadata: Metadata = {
  title: "Artem Novichkov is watching you",
  description: "Move your cursor and watch what happens",
};

export default function WatchingYouPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-40 bg-zinc-100 dark:bg-gray-900">
      <WatchingYouVideo />
    </div>
  );
}
