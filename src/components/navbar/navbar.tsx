import Links from '../links/links'
import Image from 'next/image'
import logoPic from '../../../public/images/logo.png'
import styles from './Navbar.module.scss'
import { useEffect, useState } from 'react'
const Navbar = () => {
    const [nav, setNav] = useState(false)
    const listenScrollEvent = () => {
        if (window.scrollY > 100) {
            setNav(true)
        } else if(window.scrollY <= 100){
            setNav(false)
        }
      }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return (() => window.removeEventListener('scroll', listenScrollEvent))
      }, [listenScrollEvent])
    
    return(
        <div className={`${styles.wrapper} ${nav && styles.small}`}>
            <div className={styles.container}>
                <div className={styles['image-container']}>
                    <Image
                        src={logoPic}
                        alt="Logo"
                        layout="responsive"
                    />
                </div>
                
                
                <div className={styles['links-group']}>
                    <Links name="台灣景點" path="/" color="pink"/>
                    <Links name="美食住宿" path="/" color="yellow"/>
                    <Links name="景點交通" path="/" color="green"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;