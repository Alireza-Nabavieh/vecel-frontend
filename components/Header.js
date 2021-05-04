import {useContext} from 'react'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import {FaSignInAlt,  FaSignOutAlt} from 'react-icons/fa'
import AuthContext from '@/context/AuthContext'

export default function Header() {
    const {user,logout}=useContext(AuthContext)
    
    return (
        <header className={styles.header}>  
            <div className={styles.logo}>
                <Link href='/'>
                <a> Digikala IP</a>
                </Link>
            </div>
           <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                        <a>اطلاعیه‌ها</a>
                        </Link>
                    </li>
                    {user ? 
                    //   if log in
                     <>
                        <li>
                            <Link href='/events/add'>
                                <a>پشتیبانی</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/account/dashboard'>
                                <a>داشبورد</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={()=> logout()}  className="btn-icons btn-secondary">
                            <FaSignOutAlt/>&nbsp;  خروج </button>
                        </li>
                     </> 
                     :
                    //   if logout
                      <>
                        <li>
                            <Link href='/account/login'>
                                <a className='btn-secondary btn-icon'> <FaSignInAlt/>&nbsp; ورود</a>
                            </Link>
                         </li>
                      </>}
                  
                  
                </ul>
            </nav>
        </header>
    )
}
