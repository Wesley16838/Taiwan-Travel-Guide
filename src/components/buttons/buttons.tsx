
import styles from './Buttons.module.scss';
import { ButtonProps } from '../../types/components'
import Image from 'next/legacy/image';

const Buttons = ({title, type, imagePath, imageAlt, backgroundColor, ariaLabel, onClick, disable=false}: ButtonProps) => {
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void  => {
        e.preventDefault()
        if(onClick) onClick()
    }
    if(type === 'image'){
        return(
            <button className={`${styles['image-wrapper']} ${backgroundColor && styles[backgroundColor]} ${disable && styles.disable}`} arial-label={ariaLabel} onClick={(e) => handleOnClick(e)} disabled={disable}>
                <div className={styles['image-container']}>
                    <Image
                        src={imagePath}
                        alt={imageAlt || "ButtonImage"}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                </div>
            </button>
        )
    }
    return (
        <button className={styles.wrapper} onClick={(e)=>handleOnClick(e)} disabled={disable}>
            {title}
        </button>
    )   
}

export default Buttons;