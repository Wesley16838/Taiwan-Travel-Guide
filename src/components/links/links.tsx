import Link from 'next/link'
import { LinkProps } from '../../types/components'
import styles from './Links.module.scss'
import { useTourisms } from "../../context/tourismProvider"; //Activity
import Router, { useRouter } from 'next/router'

const Links = ({path, name, color}: LinkProps) => {
    const { asPath } = useRouter()
    const { addSearch, addSearchBus } = useTourisms() 
    return(
        <button 
            className={`${styles.link} ${color && styles[color]} ${asPath.split('/')[1] === path.split('/')[1] ? styles.actived : ""}`}
            onClick={() => {
            addSearch({
                keyword: '',
                city: '', 
                category: '', 
            })
            addSearchBus({
                city:'',
                route:'',
            })
            Router.push(`${path}`)
          }}>
            {name}
        </button>
    )
}

export default Links;