import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

export default function LoginPage() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {login, error}= useContext(AuthContext)
    
    useEffect(() =>  error && toast.error(error), [error])

    const handleSubmit= e=>{
        e.preventDefault()
        
        login({email, password})
    }
    return (
        <Layout title='ورود کاربر'>
            <div className={styles.auth}>
                <h1><FaUser/> ورود
                 </h1>
                 <ToastContainer  bodyClassName="leftshow"/>
                 <form onSubmit={handleSubmit}>
                     <div>
                         <label htmlFor="email">آدرس ایمیل</label>
                         <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                     </div>
                     <div>
                         <label htmlFor="password">پسورد</label>
                         <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                     </div>
                     <input type="submit" value="ورود" className="btn" />
                 </form>
                 <p>
                     اکانت کاربری ندارید؟ <Link href='/account/register'>ثبت نام</Link>
                 </p>
            </div>
        </Layout>
    )
}
