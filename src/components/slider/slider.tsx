import Card from '../card/card'
import Buttons from '../buttons/buttons'
import styles from './Slider.module.scss'
import { SliderProps } from '../../types/components'
import { useState } from 'react'
import Router from 'next/router'
import previousIcon from '../../../public/images/previous_icon.png'
import nextIcon from '../../../public/images/next_icon.png'
const Slider = ({data}: SliderProps) => {
    const [index, setIndex] = useState(0);

    const handleOnClick = (val: number) => {
        setIndex(val)
    }

    const handleOnClickCard = (name: string, label: string) => {
        console.log(name)
        Router.push({
            pathname: '/tourism/scenicspot',
            query: { keyword: name, label: label },
        })
    }
    return(
        <div className={styles.container}>
            {index === 1 && <div className={`${styles['button-container']} ${styles['previous']}`}><Buttons backgroundColor={'white'} onClick={()=>handleOnClick(0)} imagePath={previousIcon} type={'image'}/></div>}
            <div className={styles['item-one']}>
                <Card type={"image"} name={data[index*7+0].label} imagePath={data[index*7+0].image} onClick={() => handleOnClickCard(data[index*6+0].value, data[index*6+0].label )}/>
            </div>
            <div className={styles['item-two']}>
                <Card type={"image"} name={data[index*7+1].label} imagePath={data[index*7+1].image} onClick={() => handleOnClickCard(data[index*6+1].value, data[index*6+1].label)}/>
            </div>
            <div className={styles['item-three']}>
                <Card type={"image"} name={data[index*7+2].label} imagePath={data[index*7+2].image} onClick={() => handleOnClickCard(data[index*6+2].value, data[index*6+2].label)}/>
            </div>
            <div className={styles['item-four']}>
                <Card type={"image"} name={data[index*7+3].label} imagePath={data[index*7+3].image} onClick={() => handleOnClickCard(data[index*6+3].value, data[index*6+3].label)}/>
            </div>
            <div className={styles['item-five']}>
                <Card type={"image"} name={data[index*7+4].label} imagePath={data[index*7+4].image} onClick={() => handleOnClickCard(data[index*6+4].value, data[index*6+4].label)}/>
            </div>
            <div className={styles['item-six']}>
                <Card type={"image"} name={data[index*7+5].label} imagePath={data[index*7+5].image} onClick={() => handleOnClickCard(data[index*6+5].value, data[index*6+5].label)}/>
            </div>
            <div className={styles['item-seven']}>
                <Card type={"image"} name={data[index*7+6].label} imagePath={data[index*7+6].image} onClick={() => handleOnClickCard(data[index*6+6].value, data[index*6+6].label)}/>
            </div>
            {index === 0 && <div className={`${styles['button-container']} ${styles['next']}`}><Buttons backgroundColor={'black'} onClick={()=>handleOnClick(1)} imagePath={nextIcon} type={'image'}/></div>} 
        </div>
    )
}

export default Slider;