// npm i qs

// //  import Link from 'next/link'
// import Head from 'next/head'
import Layout from  '@/components/Layout'
// install react-icons with npm i react-icons
import EventItem from  '@/components/EventItem'
import {API_URL} from '@/config/index'
import qs from 'qs'
import {useRouter} from 'next/router'
import Link from 'next/link'



export default function SearchPage({events}) {
    const router=useRouter()
  return (
    <Layout title='نتایج جستجو'>
        <Link href='/events'> بازگشت</Link>
        <h1>نتایج جستجو برای {router.query.term}</h1>
        {events.length===0 && <h3>No events to show</h3>}

        {events.map(evt=> (
          <EventItem key={evt.id} evt={evt} /> 
        ))}
        
   
    </Layout>

  )
}


export async function getServerSideProps({query:{term}}){
 const query=qs.stringify({
     _where :{
         _or:[
             {name_contains:term},
             {performers_contains:term},
             {description_contains:term},
             {venue_contains:term},
         ]
     }
 })



  const res= await fetch(`${API_URL}/events?${query}`)
  const events=await res.json()

  return {
      props:{events,
  }
}
}