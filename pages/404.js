 import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFoundPage() {
    return (
        <Layout title='page not found'>
            <div className={styles.error}>
                <h1><FaExclamationTriangle/>  404</h1>
                <h4>There is nothing here!</h4>
                <Link href="/">HomePage</Link>
            </div>
        </Layout>
    )
}
