import Link from 'next/link'
import { LinkProps } from '../../types/components'
import styles from './Links.module.scss'
const Links = ({path, name, color}: LinkProps) => {
    return(
        <Link href={path}>
            <a className={`${styles.link} ${color && styles[color]}`}>{name}</a>
        </Link>
    )
}

export default Links;