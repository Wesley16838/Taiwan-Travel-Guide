import Image from 'next/image'
import Buttons from '../buttons/buttons'
import { ModalProps } from '../../types/components'
import closeIcon from '../../../public/images/close_icon.png'
import previousIcon from '../../../public/images/previous_icon.png'
import nextIcon from '../../../public/images/next_icon.png'
import styles from './Modal.module.scss'
import { useEffect, useState } from 'react'

const Modal = ({show, index, title, description, time, ticket, location, phoneNumber, imagePath, imageAlt, onClick, onCancel}: ModalProps) => {
    const [order, setOrder] = useState(0)
    const imageArray = Object.keys(imagePath)
    useEffect(() => {
        if(show){
            document.body.style.overflow = 'hidden'
        }
        return (() => {
          document.body.style.overflow = 'unset'
        })
      }, [])

    const handleOnClick = (val: number) => {
        const total = imageArray.length/2 // 3
        let num = (order + val)%(total)
        if(num<0) num = num+total
        setOrder(num)
    }
    return(
        <div className={styles['background-cover']}>
            <div className={styles['modal-container']}>
                <div className={styles['info-wrapper']}>
                    
                    <Image src={typeof imagePath === 'string' ? imagePath : imagePath[`PictureUrl${order+1}`]} alt={imageAlt} width={612} height={459} layout={"responsive"}/>
                  
                    {
                        (typeof imagePath !== 'string' && imageArray.length/2 > 1) &&
                        <div className={styles['button-wrapper']}>
                            <div className={styles['button-container__small']}>
                                <Buttons backgroundColor={'white'} onClick={()=>handleOnClick(-1)} imagePath={previousIcon} type={'image'}/>
                            </div>
                            <div className={styles['button-container__small']}>
                                <Buttons backgroundColor={'black'} onClick={()=>handleOnClick(1)} imagePath={nextIcon} type={'image'}/>
                            </div>
                        </div>
                    }
                    <div className={styles.info}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className={styles.detail}>
                            <p>{time}</p>
                            <p>{ticket}</p>
                            <p>{location}</p>
                            <p>{phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['button-container']}>
                    <Buttons backgroundColor={'pink'} onClick={()=>onCancel()} imagePath={closeIcon} type={'image'}/>
            </div>
        </div>
    )
}

export default Modal;