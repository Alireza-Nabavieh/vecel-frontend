import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'
export default function EventItem({evt}) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={evt.image ?evt.image.formats.thumbnail.url : '/images/event-default.png'} 
                width={170}
                height={100}/>
            </div>
            <div className={styles.info}>
                <span>تاریخ انتشار: {new Date(evt.date).toLocaleDateString('fa-IR')} </span>
                <h3>{evt.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evt.slug}`}>
                    <a className='btn'>جزئیات</a>
                </Link>
            </div>
        </div>
    )
}
