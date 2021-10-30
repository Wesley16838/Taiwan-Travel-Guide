import type { NextPage } from 'next'
import { format } from 'date-fns'
import Layout from '../components/layout/layout'
import Header from '../components/header/header'
import Slider from '../components/slider/slider'
import Card from '../components/card/card'
import Modal from '../components/modal/modal'
import styles from '../../styles/Page.module.scss'
import { HotCitiesData  } from '../constants'
import { useCallback, useEffect, useState } from 'react'
import { ActivityState, FoodState } from '../types/states'
import { FoodMockData, ActivityMockData } from '../constants/mock-data'

// change state types
const Home: NextPage = () => {
  const [activities, setActivities] = useState<any[]>([])
  const [foods, setFood] = useState<any[]>([])
  const [showModal, setShowModal] = useState<any>({
    index: 0,
    type: '',
    show:false,
    target: {}
  })

  useEffect(() => {
    setFood(FoodMockData)
    setActivities(ActivityMockData)
  }, [])

  const handleOnCardClick = (type: string, index: number) => {
    setShowModal({
      index: index,
      type: type,
      show: !showModal.show,
      target: type === 'food' ? foods[index] : activities[index]
    })
  }

  return (
    <Layout pageTitle={'台灣旅遊景點導覽 - 首頁'} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"} show={showModal.show}>
      {showModal.show && 
        <Modal 
          show={showModal.show}
          index={showModal.index} 
          onClick={(val: number) => handleOnCardClick(showModal.type, val)}
          onCancel={()=> setShowModal({...showModal, show: false})}
          title={showModal.target.Name}
          description={showModal.target.Description}
          time={showModal.type === 'food' ? showModal.target.OpenTime : `${format(Date.parse(showModal.target.StartTime), 'yyyy/MM/dd')} - ${format(Date.parse(showModal.target.EndTime), 'yyyy/MM/dd')}`} 
          ticket={showModal.type === 'food' ? '--' : `${showModal.target.Charge ? showModal.target.Charge : '--'}`}  
          location={showModal.target.Location ? showModal.target.Location : showModal.target.Address}  
          phoneNumber={showModal.target.Phone ? showModal.target.Phone : '--'} 
          imagePath={showModal.target.Picture?.PictureUrl1 ? showModal.target.Picture.PictureUrl1 : "/images/no_image_available.png"}
          imageAlt={showModal.target.Picture?.PictureDescription1 ? showModal.target.Picture?.PictureDescription1 : 'Modal Image'}
        />}
      <Header/>
      <section>
        <article className={styles['page-article']}>
          <div className={styles.topic}>
            <h2>熱門城市</h2>
          </div>
          <Slider data={HotCitiesData} />
        </article>
        <article className={styles['page-article']}>
          <div className={styles.topic}>
            <h2>熱門活動</h2> 
            <div className={styles['activity-wrapper']}>
              {
                activities.map((activity, index) => {
                  return(
                    <Card 
                      key={activity.Name}
                      onClick={() => handleOnCardClick('activity', index)} 
                      type={'medium'} 
                      name={activity.Name} 
                      description={activity.Description} 
                      location={activity.Location} 
                      imagePath={Object.keys(activity.Picture).length !== 0 ? activity.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                      imageAlt={Object.keys(activity.Picture).length !== 0 ? activity.Picture.PictureDescription1 : "Activity Image"}
                    />
                  )
                })
              }
            </div>
          </div>
        </article>
        <article className={styles['page-article']}>
          <div className={styles.topic}>
            <h2>熱門餐飲</h2>
            <div className={styles['food-wrapper']}>
              {
                foods.map((food, index) => {
                  return(
                    <Card 
                      key={food.Name}
                      onClick={() => handleOnCardClick('food', index)} 
                      type={'small'} 
                      name={food.Name} 
                      description={food.Description} 
                      location={food.Address} 
                      imagePath={Object.keys(food.Picture).length !== 0 ? food.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                      imageAlt={Object.keys(food.Picture).length !== 0 ? food.Picture.PictureDescription1 : "Activity Image"}
                    />
                  )
                })
              }
            </div>
          </div>
        </article>
      </section>
    </Layout>
  )
}

export default Home
