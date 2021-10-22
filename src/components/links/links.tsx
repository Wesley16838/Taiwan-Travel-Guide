import Link from 'next/link'
import { linkProps } from '../../types/components'

const Links = ({path, name}: linkProps) => {
    return(
        <Link href={path}>
            <a>{name}</a>
        </Link>
    )
}

export default Links;