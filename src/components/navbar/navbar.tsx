import Links from '../links/links'
import Image from 'next/image'
import logoPic from '../../../public/images/logo.png'
import styles from './Navbar.module.scss'
import { useEffect, useState } from 'react'
const Navbar = (props: any) => {
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
        <div className={`${styles.wrapper} ${nav ? styles.small : ''}`}>
            <div className={styles.container}>
                <div className={styles['image-container']}>
                    <Image
                        src={logoPic}
                        alt="Logo"
                        layout="responsive"
                    />
                </div>
                
                
                <div className={styles['links-group']}>
                    <Links name="台灣景點" path="/scenicspot-and-activity" color="pink"/>
                    <Links name="美食住宿" path="/food-and-hotel" color="yellow"/>
                    <Links name="景點交通" path="/transportation" color="green"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;