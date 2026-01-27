import Image from "next/image"
import Projects from "./_components/projects"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start mt-4">
      <Image
        className="rounded-full"
        priority
        src="/images/avatar.jpg"
        height={144}
        width={144}
        alt="Artem Novichkov"
      />
      <p className="font-bold text-3xl tracking-tight mt-4 mb-2 text-zinc-800 dark:text-gray-100">
        Hey, I&apos;m Artem Novichkov
      </p>
      <div className="flex flex-col gap-2 mb-8 text-zinc-800 dark:text-gray-100">
        <p>
          I&apos;m an iOS developer at Salmon Group Ltd, building the&nbsp;
          <a
            className="text-base underline"
            href="https://salmon.ph"
            target="_blank"
            rel="noopener noreferrer"
          >
            Salmon app
          </a>{" "}
          — a fintech super app bringing accessible financial services to
          millions of Filipinos.
        </p>
        <p>
          From time to time, I do mentoring and consulting for developers and
          companies navigating iOS development challenges.
        </p>
        <p>
          I&apos;m passionate about Swift and open-source. You can find my
          projects on&nbsp;
          <a
            className="text-base underline"
            href="https://github.com/artemnovichkov"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . Lately I&apos;ve been exploring ways to integrate AI into my
          development workflows.
        </p>
        <p>
          I write blog posts mostly about SwiftUI and occasionally share
          knowledge through public speaking. Check out my talks on&nbsp;
          <a
            className="text-base underline"
            href="https://www.youtube.com/playlist?list=PLRSU1SC70qRudLaYKSjM14tJmA-J-dRvU"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          .
        </p>
        <p>
          In my free time, I enjoy flying FPV drones and editing the videos I
          capture. I also like playing video games on my Nintendo Switch 2 and
          PS 5.
        </p>
      </div>
      <Projects />
    </div>
  )
}
