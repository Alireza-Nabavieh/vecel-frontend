import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import {API_URL} from '@/config/index'
import {parseCookie} from '@/helpers/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({events,token}) {

    const router = useRouter()
    
    const deleteEvent= async (id)=>{
        if(confirm('Are you sure?')){
          const res=await fetch(`${API_URL}/events/${id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${token}`
            }
          })
  
          const data=await res.json()
  
          if(!res.ok){
            toast.error(data.message)
          }
          else {
            router.reload()
          }
        }
      }
    return (
        <Layout title="داشبورد کاربر">
            <div className={styles.dash}>
                 <h1>داشبورد</h1>
                 <h3>محتوای ثبت شده من</h3>

                 {events.map((evt)=>(
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
                 ))}
            </div>
            
        </Layout>
    )
}


export async function getServerSideProps({req}){
    const {token}=parseCookie(req)

    const res=await fetch(`${API_URL}/events/me`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const events=await res.json()

    return {
        props:{
            events,
            token
        }
    }
}