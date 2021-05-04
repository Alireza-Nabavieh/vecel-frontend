import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'


export default function RegisterPage() {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordConfirm,setPasswordConfirm]=useState('')

    const {register, error}= useContext(AuthContext)

    useEffect(()=> error &&  toast.error(error),[error])

    const handleSubmit= e=>{
        e.preventDefault()

        if(password !== passwordConfirm){
            toast.error("رمز عبور مطابقت ندارد!")
            return
        }

        register({username,email,password })
    }
    return (
        <Layout title='ثبت نام کاربر'>
            <div className={styles.auth}>
                <h1><FaUser/> ثبت نام
                 </h1>
                 <ToastContainer bodyClassName="leftshow"/>
                 <form onSubmit={handleSubmit}>
                 <div>
                         <label htmlFor="username">نام کاربری  </label>
                         <input type="text" id="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                     </div>
                     <div>
                         <label htmlFor="email">آدرس ایمیل</label>
                         <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                     </div>
                     <div>
                         <label htmlFor="password">پسورد</label>
                         <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                     </div>
                     <div>
                         <label htmlFor="passwordConfirm">تائید پسورد</label>
                         <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)}/>
                     </div>
                     <input type="submit" value="ثبت نام" className="btn" />
                 </form>
                 <p>
                      حساب کاربری دارید؟ <Link href='/account/login'>ورود</Link>
                 </p>
            </div>
        </Layout>
    )
}
