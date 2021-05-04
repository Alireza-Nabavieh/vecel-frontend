 
// import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import {API_URL} from '@/config/index'
import {useRouter} from 'next/router'
import styles from '@/styles/Event.module.css'
 

export default function Event({evt}) {
    
    //  npm i react-map-gl and react-geocode for map

    const router=useRouter()

    // const deleteEvent= async (e)=>{
    //   if(confirm('Are you sure?')){
    //     const res=await fetch(`${API_URL}/events/${evt.id}`,{
    //       method:'DELETE',
    //     })

    //     const data=await res.json()

    //     if(!res.ok){
    //       toast.error(data.message)
    //     }
    //     else {
    //       router.push('/events')
    //     }
    //   }
    // }
    return (
      // بخش حذف و ویرایش به صورت لینک از این قسمت میتواند حذف شود
        <Layout>
            <div className={styles.event}>
               {/* <div className={styles.controls}>
                 <Link href={`/events/edit/${evt.id}`}>
                   <a>
                     <FaPencilAlt/> Edit Event
                   </a>
                 </Link>
                 <a href="#" className={styles.delete}
                 onClick={deleteEvent}>
                   <FaTimes/> Delete Event
                 </a>
                </div>   */}

                <span>
                 تاریخ انتشار: {new Date(evt.date).toLocaleDateString('fa-IR')}  
                </span>
                <h1>{evt.name}</h1>
                <ToastContainer bodyClassName="leftshow"/>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image.formats.medium.url} width={960} height={600}/>
                    </div>
                )}
                <h3>نویسنده:</h3>
                <p>{evt.performers}</p>
                <h3>شرح مطلب:</h3>
                <p>{evt.description}</p>
                <h3>کلید واژه‌ها:</h3>
                <p>{evt.venue}</p>
                {/* <h3>Address:</h3>
                <p>{evt.address}</p> */}

                {/* <EventMap evt={evt}/> */}

                <Link href='/events'>
                  <a className={styles.back}>
                    {'<'} بازگشت
                  </a>
                </Link>
            </div>
            {/* <h3>{router.query.slug}</h3> */}
        </Layout>
    )
}


 

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }))

//   return {
//         // paths:[
//         //     {params:{slug:1}},
//         //     {params:{slug:2}},
//         //     {params:{slug:3}},
//         // ]
//     paths,
//     fallback: false,
//     // if true for dynamic website request again to get net paths in false show 404
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt:  events[0]  
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({query:
{slug}}){
    const res=await fetch(`${API_URL}/events?slug=${slug}`)
    const events=await res.json()
    return {
        props:{
            evt:events[0]
        },
    }
}