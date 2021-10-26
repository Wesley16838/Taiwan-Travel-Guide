import Links from '../links/links'
import Image from 'next/image'
import logoPic from '../../../public/logo.png'
import styles from './Navbar.module.scss'
const Navbar = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image
                    src={logoPic}
                    alt="Logo"
                    width={99}
                    height={57}
                />
                
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