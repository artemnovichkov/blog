import Image from "next/image"

export default function Experience() {
    return (
        <div>
            <p className="font-bold text-3xl tracking-tight mb-4 text-zinc-800 dark:text-gray-100">
                Experience
            </p>
            <h3 className="font-bold text-2xl tracking-tight mb-4 text-zinc-800 dark:text-gray-100">
                Full-time positions
            </h3>
            <ul>
                {fullTimePositions.map((position) => (
                    <li key={position.company}>
                        <Position position={position} />
                    </li>
                ))}
            </ul>
            <h3 className="font-bold text-2xl tracking-tight mb-4 text-zinc-800 dark:text-gray-100">
                Part-time positions
            </h3>
            <ul>
                {partTimePositions.map((position) => (
                    <li key={position.company}>
                        <Position position={position} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface PositionProps {
    position: {
        title: string;
        company: string;
        image: string;
        url: string;
        startDate: string;
        finishDate?: string;
    }
}

const Position: React.FC<PositionProps> = ({ position }) => {
    const startDate = new Date(position.startDate)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const startDateTag = (<time dateTime={startDate.toISOString()}>{startDate.toLocaleDateString('en-US', options)}</time>)
    let finishDateTag = (<p>{`Current`}</p>)
    if (position.finishDate != undefined) {
        const finishDate = new Date(position.finishDate)
        finishDateTag = (<time dateTime={finishDate.toISOString()}>{finishDate.toLocaleDateString('en-US', options)}</time>)
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
            <div className="flex flex-col">
                <p className="text-x font-bold text-zinc-800 dark:text-gray-100">{position.title}</p>
                <a className="text-base underline text-zinc-800 dark:text-gray-100"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={position.url}>
                    {position.company}
                </a>
                <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-gray-400">
                    {startDateTag}
                    {`→`}
                    {finishDateTag}
                </div>
            </div>
        </div>
    )
}

const fullTimePositions = [
    {
        title: "iOS Developer",
        company: "Salmon Group Ltd",
        image: "/images/companies/salmon.png",
        url: "https://salmon.ph",
        startDate: "2025-03",
    },
    {
        title: "iOS Developer",
        company: "Welltory",
        image: "/images/companies/welltory.png",
        url: "https://welltory.com",
        startDate: "2022-06",
        finishDate: "2025-03",
    },
    {
        title: "iOS Developer",
        company: "Skyeng",
        image: "/images/companies/skyeng.png",
        url: "https://skyeng.ru",
        startDate: "2020-07",
        finishDate: "2022-06",
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

const partTimePositions = [
    {
        title: "iOS Expert",
        company: "Netology",
        image: "/images/companies/netology.png",
        url: "https://netology.ru/programs/ios-developer",
        startDate: "2020-08",
        finishDate: "2022-12",
    },
    {
        title: "iOS Mentor",
        company: "Solvery",
        image: "/images/companies/solvery.png",
        url: "https://solvery.io/ru/mentor/artemnovichkov",
        startDate: "2021-08",
    },
    {
        title: "iOS Mentor",
        company: "Codementor",
        image: "/images/companies/codementor.png",
        url: "https://www.codementor.io/@artemnovichkov",
        startDate: "2017-12",
        finishDate: "2022-02",
    },
    {
        title: "Freelance iOS Developer",
        company: "Upwork",
        image: "/images/companies/upwork.png",
        url: "https://www.upwork.com/freelancers/~01be851609bdb126f7",
        startDate: "2014-07",
        finishDate: "2019-07",
    },
]