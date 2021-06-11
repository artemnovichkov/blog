import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

export default function PostPreview({ post }) {
    return (
        <div style={{border: '1px solid gray', borderRadius: '5px', padding: '5px'}}>
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
            <small className={utilStyles.lightText}>
                <Date dateString={post.frontMatter.date}/>
            </small>
        </div>
    )
}