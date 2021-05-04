
import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
 

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p> Copyright &copy;  Digikala IP</p>
            <p>
                 <Link href="/about"> معرفی تیم خرید </Link>
            </p>
        </footer>
    )
}


 