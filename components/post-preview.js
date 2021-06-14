import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'

export default function PostPreview({ post }) {
    return (
        <div>
            <div style={{ position: 'relative', width: '300px', height: '200px' }}>
                <Image 
                    priority
                    layout="fill"
                    objectFit="cover"
                    src={post.frontMatter.image}
                />
            </div>
            <Link href={post.url}>
            <a>{post.frontMatter.title}</a>
            </Link>
            <br />
            <small>
                <Date dateString={post.frontMatter.date}/>
            </small>
        </div>
    )
}