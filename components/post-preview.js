import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

export default function PostPreview({ postData }) {
    return (
        <div style={{border: '1px solid gray', borderRadius: '5px', padding: '5px'}}>
            <div style={{ position: 'relative', width: '300px', height: '200px' }}>
                <Image 
                    priority
                    layout="fill"
                    objectFit="cover"
                    src={`/images/${postData.id}/cover.png`}
                />
            </div>
            <Link href={`posts/${postData.id}`}>
            <a>{postData.title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </small>
        </div>
    )
}