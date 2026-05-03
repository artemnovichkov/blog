import Image from "next/image"
import { getAllPosts } from "@/lib/api"
import Projects from "./_components/projects"
import RecentPosts from "./_components/recent-posts"

export default function Home() {
  const recent = getAllPosts().slice(0, 2)

  return (
    <div className="shell">
      <section className="home-hero">
        <div className="hero-row">
          <div className="head-col reveal">
            <h1>
              Hey, I&apos;m
              <br />
              <em>Artem</em> <span className="ampersand">&amp;</span>
              <br />I write Swift.
            </h1>
            <div className="strap reveal d2">
              <p>
                iOS developer at Salmon Group Ltd, building{" "}
                <a
                  href="https://salmon.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the Salmon app
                </a>{" "}
                — a fintech super app bringing accessible financial services to
                millions of Filipinos.
              </p>
            </div>
          </div>
          <div className="portrait reveal d3">
            <Image
              src="/images/avatar.jpg"
              alt="Artem Novichkov"
              priority
              width={720}
              height={900}
              sizes="(max-width: 900px) 240px, 360px"
            />
          </div>
        </div>
      </section>

      <section className="about">
        <div className="grid12">
          <div className="label">About</div>
          <div className="body">
            <p>
              iOS developer at{" "}
              <a
                href="https://salmon.ph"
                target="_blank"
                rel="noopener noreferrer"
              >
                Salmon Group Ltd
              </a>
              , building the Salmon app — a fintech super app bringing
              accessible financial services to millions of Filipinos.
            </p>
            <p>
              From time to time, I do <em>mentoring and consulting</em> for
              developers and companies navigating iOS development challenges.
            </p>
            <p>
              I&apos;m passionate about Swift and open-source. You can find my
              projects on{" "}
              <a
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
              In my free time, I enjoy flying FPV drones and editing the videos
              I capture. I also like playing video games on my Nintendo Switch 2
              and PS 5.
            </p>
          </div>
        </div>
      </section>

      <Projects />

      {recent.length > 0 && <RecentPosts posts={recent} />}
    </div>
  )
}
