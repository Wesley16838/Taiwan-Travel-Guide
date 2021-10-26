import Image from 'next/image'
import { CardProps } from '../../types/components'
import Buttons from '../buttons/buttons'
import styles from './Card.module.scss'
import locationIcon from '../../../public/images/location_icon_no_circle.png'
const Card= ({type, name, imagePath, onClick, description, location, imageAlt}: CardProps) => {
    if(type === "image"){
        const handleOnImageOnclick = () => {
            if(onClick) onClick()
        }
        return(
            <div className={styles['image-container']} style={{backgroundImage: `url(${imagePath})`}} tabIndex={0} role="button" onClick={() => handleOnImageOnclick()}>
                <div className={styles.name}>
                    <Image src={locationIcon} alt={'Location Icon'} width={24} height={24}/>
                    <p>{name}</p>
                </div>
                <div className={styles['image-shadow']}></div>
            </div>
        )
    }

    const handleOnClick = () => {

    }

    return(
        <div className={`${styles[`container__${type}`]}`}>
            <div className={styles['image-container']}>
                <Image src={imagePath} alt={imageAlt} layout={'fill'}/>
            </div>
            <div className={styles.information}>
                <h3 className={styles.title}>
                    {name}
                </h3>
                {type === 'medium' &&
                    <p className={styles.detail}>
                        {description && description.length > 96 ? description.slice(0, 90)+'...': description}
                    </p>
                }
                <div className={styles.footer}>
                    <p className={styles.location}>
                        {location}
                    </p>
                    {type === 'medium' &&
                        <div className={styles['button-container']}>
                            <Buttons title={'活動詳情'} onClick={() => handleOnClick()}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

    
}

export default Card;