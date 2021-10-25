import Card from '../card/card'
import Buttons from '../buttons/buttons'
import styles from './Slider.module.scss'
import { SliderProps } from '../../types/components'
import { useState } from 'react'
import previousIcon from '../../../public/previous_icon.png'
import nextIcon from '../../../public/next_icon.png'
const Slider = ({data}: SliderProps) => {
    const [index, setIndex] = useState(0);

    const handleOnClick = (val: number) => {
        setIndex(val)
    }

    const handleOnClickCard = (name: string) => {
        console.log(name)
    }
    return(
        <div className={styles.container}>
            {index === 1 && <div className={`${styles['button-container']} ${styles['previous']}`}><Buttons backgroundColor={'white'} onClick={()=>handleOnClick(0)} imagePath={previousIcon} type={'image'}/></div>}
            <div className={styles['item-one']}>
                <Card type={"image"} name={data[index*6+0].label} imagePath={data[index*6+0].image} onClick={() => handleOnClickCard(data[index*6+0].value)}/>
            </div>
            <div className={styles['item-two']}>
                <Card type={"image"} name={data[index*6+1].label} imagePath={data[index*6+1].image} onClick={() => handleOnClickCard(data[index*6+1].value)}/>
            </div>
            <div className={styles['item-three']}>
                <Card type={"image"} name={data[index*6+2].label} imagePath={data[index*6+2].image} onClick={() => handleOnClickCard(data[index*6+2].value)}/>
            </div>
            <div className={styles['item-four']}>
                <Card type={"image"} name={data[index*6+3].label} imagePath={data[index*6+3].image} onClick={() => handleOnClickCard(data[index*6+3].value)}/>
            </div>
            <div className={styles['item-five']}>
                <Card type={"image"} name={data[index*6+4].label} imagePath={data[index*6+4].image} onClick={() => handleOnClickCard(data[index*6+4].value)}/>
            </div>
            <div className={styles['item-six']}>
                <Card type={"image"} name={data[index*6+5].label} imagePath={data[index*6+5].image} onClick={() => handleOnClickCard(data[index*6+5].value)}/>
            </div>
            <div className={styles['item-seven']}>
                <Card type={"image"} name={data[index*6+6].label} imagePath={data[index*6+6].image} onClick={() => handleOnClickCard(data[index*6+6].value)}/>
            </div>
            {index === 0 && <div className={`${styles['button-container']} ${styles['next']}`}><Buttons backgroundColor={'black'} onClick={()=>handleOnClick(1)} imagePath={nextIcon} type={'image'}/></div>} 
        </div>
    )
}

export default Slider;