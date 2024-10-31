import Image from "next/image"
import Experience from "./_components/experience";

export default function About() {
    return (
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto">
            <p className="font-bold text-3xl tracking-tight mb-8 text-zinc-800 dark:text-gray-100">About Me</p>
            <Image
                className="rounded-full"
                priority
                src="/images/avatar.jpg"
                height={144}
                width={144}
                alt="Artem Novichkov"
            />
            <div className="flex flex-col gap-2 my-4 text-zinc-800 dark:text-gray-100">
                <p>
                    Hi there! My name is Artem Novichkov. I am an iOS Developer.
                </p>
                <p>
                    I work at Welltory, where I&apos;m developing an app that enables users to sync data from other apps and gadgets to gain insights into their health and lifestyle.
                </p>
                <p>
                    Besides my main work, I focus on individual mentoring and consultations for developers and companies, helping them solve their challenges in iOS development. I also worked with the online platform Netology, where I created teaching materials, reviewed student assignments, and conducted over 100 online lectures.
                </p>
                <p>
                    I am passionate about Swift and open-source development. My primary focus is on the iOS platform, and sometimes I publish interesting and useful content on my&nbsp;
                    <a className="text-base underline" href="https://github.com/artemnovichkov" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>. I am currently working on developing pet projects and writing blog posts on SwiftUI.
                </p>
                <p>
                    Occasionally, I also enjoy sharing my knowledge through public speaking. You can find a playlist of my talks on&nbsp;
                    <a className="text-base underline" href="https://www.youtube.com/playlist?list=PLRSU1SC70qRudLaYKSjM14tJmA-J-dRvU" target="_blank" rel="noopener noreferrer">
                        Youtube
                    </a>.
                </p>
                <p>
                    In my free time, I enjoy flying FPV drones and editing the videos I capture. I also like playing video games on my Nintendo Switch OLED and PS 5.
                </p>
            </div>
           <Experience />
        </div>
    )
}
