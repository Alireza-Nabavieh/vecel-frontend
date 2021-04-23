import React from 'react'
import Head from 'next/head'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'

export default function Layout({title, keywords,description, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
            <Header/>
            <div className={styles.container}>
                 {children} 
            </div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps={
    title:'DJ Events parties',
    description:'You did it!',
    keywords:'music,DJ'
}