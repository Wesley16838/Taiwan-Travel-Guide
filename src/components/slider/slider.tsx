import Card from '../card/card'
import Buttons from '../buttons/buttons'
import styles from './Slider.module.scss'
import { SliderProps } from '../../types/components'
import { useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import ScrollContainer from 'react-indiana-drag-scroll'
import previousIcon from '../../../public/images/previous_icon.png'
import nextIcon from '../../../public/images/next_icon.png'
const Slider = ({data}: SliderProps) => {

    const [index, setIndex] = useState(0);

    const handleOnClick = (val: number) => {
        setIndex(val)
    }
    
    // KinmenCounty PenghuCounty LienchiangCounty
    const handleOnClickCard = (name: string, label: string) => {
        Router.push({
            pathname: '/scenicspot-and-activity/search',
            query: { city: name, category: 'ScenicSpot', page: 1 },
        })
    }
    return(
    <>
        <div className={styles['container-lg']}>
            {index === 1 && <div className={`${styles['button-container']} ${styles['previous']}`}><Buttons backgroundColor={'white'} onClick={()=>handleOnClick(0)} imagePath={previousIcon} type={'image'}/></div>}
            <div className={styles['item-one']}>
                <Card type={"image"} name={data[index*7+0].label} imagePath={data[index*7+0].image} onClick={() => handleOnClickCard(data[index*7+0].value, data[index*7+0].label)} preload={true}/>
            </div>
            <div className={styles['item-two']}>
                <Card type={"image"} name={data[index*7+1].label} imagePath={data[index*7+1].image} onClick={() => handleOnClickCard(data[index*7+1].value, data[index*7+1].label)} preload={true}/>
            </div>
            <div className={styles['item-three']}>
                <Card type={"image"} name={data[index*7+2].label} imagePath={data[index*7+2].image} onClick={() => handleOnClickCard(data[index*7+2].value, data[index*7+2].label)} preload={true}/>
            </div>
            <div className={styles['item-four']}>
                <Card type={"image"} name={data[index*7+3].label} imagePath={data[index*7+3].image} onClick={() => handleOnClickCard(data[index*7+3].value, data[index*7+3].label)} preload={true}/>
            </div>
            <div className={styles['item-five']}>
                <Card type={"image"} name={data[index*7+4].label} imagePath={data[index*7+4].image} onClick={() => handleOnClickCard(data[index*7+4].value, data[index*7+4].label)} preload={true}/>
            </div>
            <div className={styles['item-six']}>
                <Card type={"image"} name={data[index*7+5].label} imagePath={data[index*7+5].image} onClick={() => handleOnClickCard(data[index*7+5].value, data[index*7+5].label)} preload={true}/>
            </div>
            <div className={styles['item-seven']}>
                <Card type={"image"} name={data[index*7+6].label} imagePath={data[index*7+6].image} onClick={() => handleOnClickCard(data[index*7+6].value, data[index*7+6].label)} preload={true}/>
            </div>
            {index === 0 && <div className={`${styles['button-container']} ${styles['next']}`}><Buttons backgroundColor={'black'} onClick={()=>handleOnClick(1)} imagePath={nextIcon} type={'image'}/></div>} 
        </div>
        <ScrollContainer className={styles.wrapper} vertical={false}>
            <div 
                className={styles['container']}
            >
                <div className={styles['item-one']}>
                    <Card type={"image"} name={data[0].label} imagePath={data[0].image} onClick={() => handleOnClickCard(data[0].value, data[0].label)} preload={true}/>
                </div>
                <div className={styles['item-two']}>
                    <Card type={"image"} name={data[1].label} imagePath={data[1].image} onClick={() => handleOnClickCard(data[1].value, data[1].label)} preload={true}/>
                </div>
                <div className={styles['item-three']}>
                    <Card type={"image"} name={data[2].label} imagePath={data[2].image} onClick={() => handleOnClickCard(data[2].value, data[2].label)} preload={true}/>
                </div>
                <div className={styles['item-four']}>
                    <Card type={"image"} name={data[3].label} imagePath={data[3].image} onClick={() => handleOnClickCard(data[3].value, data[3].label)} preload={true}/>
                </div>
                <div className={styles['item-five']}>
                    <Card type={"image"} name={data[4].label} imagePath={data[4].image} onClick={() => handleOnClickCard(data[4].value, data[4].label)} preload={true}/>
                </div>
                <div className={styles['item-six']}>
                    <Card type={"image"} name={data[5].label} imagePath={data[5].image} onClick={() => handleOnClickCard(data[5].value, data[5].label)} preload={true}/>
                </div>
                <div className={styles['item-seven']}>
                    <Card type={"image"} name={data[6].label} imagePath={data[6].image} onClick={() => handleOnClickCard(data[6].value, data[6].label)} preload={true}/>
                </div>
                <div className={styles['item-eight']}>
                    <Card type={"image"} name={data[7].label} imagePath={data[7].image} onClick={() => handleOnClickCard(data[7].value, data[7].label)} preload={true}/>
                </div>
                <div className={styles['item-nine']}>
                    <Card type={"image"} name={data[8].label} imagePath={data[8].image} onClick={() => handleOnClickCard(data[8].value, data[8].label)} preload={true}/>
                </div>
                <div className={styles['item-ten']}>
                    <Card type={"image"} name={data[9].label} imagePath={data[9].image} onClick={() => handleOnClickCard(data[9].value, data[9].label)} preload={true}/>
                </div>
                <div className={styles['item-eleven']}>
                    <Card type={"image"} name={data[10].label} imagePath={data[10].image} onClick={() => handleOnClickCard(data[10].value, data[10].label)} preload={true}/>
                </div>
                <div className={styles['item-twelve']}>
                    <Card type={"image"} name={data[11].label} imagePath={data[11].image} onClick={() => handleOnClickCard(data[11].value, data[11].label)} preload={true}/>
                </div>
                <div className={styles['item-thirteen']}>
                    <Card type={"image"} name={data[12].label} imagePath={data[12].image} onClick={() => handleOnClickCard(data[12].value, data[12].label)} preload={true}/>
                </div>
                <div className={styles['item-fourteen']}>
                    <Card type={"image"} name={data[13].label} imagePath={data[13].image} onClick={() => handleOnClickCard(data[13].value, data[13].label)} preload={true}/>
                </div>
            </div>
        </ScrollContainer>
    </>
    )
}

export default Slider;