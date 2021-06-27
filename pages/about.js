import Container from "../components/container"
import Image from "next/image"
import { parseISO, format } from 'date-fns'

const Position = ({ position }) => {
    const startDate = parseISO(position.startDate)
    var finishDateTag = (<p>{`Current`}</p>)
    if (position.finishDate != undefined) {
        const finishDate = parseISO(position.finishDate)
        finishDateTag = (<time dateTime={finishDate}>{format(finishDate, 'LLL yyyy')}</time>)
    }
    return (
        <div className="flex flex-row items-start gap-4 mb-4">
            <Image
                className="rounded"
                priority
                alt={position.company}
                src={position.image}
                width={40}
                height={40}
            />
            <div className="flex flex-col items-start">
            <p className="text-xl">{position.title}</p>
            <a className="text-base underline"
                target="_blank"
                rel="noopener noreferrer"
                href={position.url}>
                {position.company}
            </a>
            <div className="flex items-center gap-1 text-sm text-gray-400">
                <time dateTime={startDate}>{format(startDate, 'LLL yyyy')}</time>
                {`→`}
                {finishDateTag}
            </div>
        </div>
        </div>
    )
}

const positions = [
    {
        title: "iOS Developer",
        company: "Skyeng",
        image: "/images/companies/skyeng.png",
        url: "https://skyeng.ru",
        startDate: "2020-07",
    },
    {
        title: "iOS Expert",
        company: "Netology",
        image: "/images/companies/netology.png",
        url: "https://netology.ru",
        startDate: "2020-08",
    },
    {
        title: "iOS Mentor",
        company: "Codementor",
        image: "/images/companies/codementor.png",
        url: "https://www.codementor.io",
        startDate: "2017-12",
    },
    {
        title: "Freelance iOS Developer",
        company: "Upwork",
        image: "/images/companies/upwork.png",
        url: "https://www.upwork.com",
        startDate: "2015-09",
        finishDate: "2018-09",
    },
    {
        title: "iOS Developer",
        company: "Rosberry",
        image: "/images/companies/rosberry.png",
        url: "https://rosberry.com",
        startDate: "2014-11",
        finishDate: "2020-07",
    },
    {
        title: "iOS Developer",
        company: "Burning Buttons",
        image: "/images/companies/burning_buttons.png",
        url: "https://burningbuttons.com",
        startDate: "2014-02",
        finishDate: "2014-05",
    }
]

export default function About() {
    return (
        <Container title="About – Artem Novichkov">
            <div className="flex flex-col justify-center items-start max-w-2xl mx-auto">
                <h1 className="font-bold text-3xl tracking-tight mb-4 text-black">
                    About Me
                </h1>
                <div className="flex flex-col gap-2 mb-4">
                    <p>
                        Hi there! I'm Artem Novichkov. I live in Omsk, Russia (UTC+6).
                    </p>
                    <p>
                        📝 I'm currently working as an iOS Developer at Skyeng, developing&nbsp;
                        <a className="text-base underline" href="https://apps.apple.com/app/id1473109163" target="_blank" rel="noopener noreferrer">
                            Skysmart
                        </a>
                        &nbsp;app that helps school students get A's for homeworks.
                    </p>
                    <p>
                    👨‍🏫 My second work activity is teaching at Netology on iOS development course. I host webinars, check homeworks and courseworks and develop teaching materials.
                    </p>
                    <p>
                        🧑🏻‍💻 I really like Swift and Open Source. I mostly write for iOS platform and publish interesting and useful things on my&nbsp;
                        <a className="text-base underline" href="https://github.com/artemnovichkov" target="_blank" rel="noopener noreferrer">
                            Github
                        </a>
                        . Now I'm focusing on SwiftUI, developing pet projects and writing blog posts.
                    </p>
                    <p>
                        💻 I'm the host of&nbsp;
                        <a className="text-base underline" href="https://t.me/subtlesettings" target="_blank" rel="noopener noreferrer">
                        Subtle Settings
                        </a>
                        &nbsp;Telegram channel. I write entertaining posts about my dev and life experience.
                    </p>
                    <p>
                    🕹 In free time I play videogames with Nintendo Switch и PS4 Pro. I like Nintendo exclusives, sometimes drop in PvP battles.
                    </p>
                </div>
                <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
                    Experience
                </h2>
                <ul>
                    {positions.map((position) => (
                        <li key={position.company}>
                            <Position position={position}/>
                        </li>
                    ))}
                </ul>
                <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
                    Contacts
                </h2>
                <ul className="mb-4">
                    <li>
                        <a className="text-base underline" href="mailto:mail@artemnovichkov.com" target="_blank" rel="noopener noreferrer">
                        mail@artemnovichkov.com
                        </a>
                    </li>
                </ul>
            </div>
        </Container>
    )
}