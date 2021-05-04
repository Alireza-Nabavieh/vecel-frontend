// //  import Link from 'next/link'
// import Head from 'next/head'
import Layout from  '@/components/Layout'
// install react-icons with npm i react-icons
import EventItem from  '@/components/EventItem'

import {API_URL} from '@/config/index'
import Link from 'next/link'

export default function HomePage({events}) {
  return (
    <Layout>
        <h1>صفحه نخست</h1>
        {events.length===0 && <h3>No events to show</h3>}

        {events.map(evt=> (
          <EventItem key={evt.id} evt={evt} /> 
        ))}

        {events.length>0 && (
              <Link href="/events">
                <a className='btn-secondary'> نمایش تمام اطلاعیه‌ها</a>
              </Link>
            )}
    </Layout>
  )
}


export async function getServerSideProps(){
  const res= await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events=await res.json()

  return {
      props:{events,
        revalidate : 1},
  }
}

// install npm i strapi-provider-upload-cloudinary in backend and add plugins to config of strapi