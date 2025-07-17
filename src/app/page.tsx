import Image from "next/image"
import Experience from "./_components/experience";

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
            <p className="font-bold text-3xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">Hey, I&apos;m Artem Novichkov</p>
            <div className="flex flex-col gap-2 my-4 text-zinc-800 dark:text-gray-100">
                <p>
                    I am an iOS Developer. I work at Salmon Group Ltd, developing the Salmon app — a super app designed to connect millions of Filipinos with reliable financial services, making finance accessible and easy.
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
                    In my free time, I enjoy flying FPV drones and editing the videos I capture. I also like playing video games on my Nintendo Switch 2 and PS 5.
                </p>
            </div>
           <Experience />
        </div>
    )
}
