
import styles from './Buttons.module.scss';
import { ButtonProps } from '../../types/components'
import Image from 'next/image';

const Buttons = ({title, type, imagePath, imageAlt, backgroundColor, ariaLabel, onClick}: ButtonProps) => {
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void  => {
        e.preventDefault()
        if(onClick) onClick()
    }
    if(type === 'image'){
        return(
            <button className={`${styles['image-wrapper']} ${backgroundColor && styles[backgroundColor]}`} arial-label={ariaLabel} onClick={(e) => handleOnClick(e)}>
                <div className={styles['image-container']}>
                    <Image
                        src={imagePath}
                        alt={imageAlt}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                </div>
            </button>
        )
    }
    return (
        <button className={styles.wrapper} onClick={(e)=>handleOnClick(e)}>
            {title}
        </button>
    )   
}

export default Buttons;