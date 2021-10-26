import type { NextPage } from 'next'
import Layout from '../components/layout/layout'
import Header from '../components/header/header'
import Slider from '../components/slider/slider'
import Card from '../components/card/card'
import styles from '../../styles/Page.module.scss'
import { HotCitiesData  } from '../constants'
import { useEffect, useState } from 'react'
import { ActivityState, FoodState } from '../types/states'
import { FoodMockData, ActivityMockData } from '../constants/mock-data'

const Home: NextPage = () => {
  const [activities, setActivities] = useState<any[]>([])
  const [foods, setFood] = useState<any[]>([])

  useEffect(() => {
    setFood(FoodMockData)
    setActivities(ActivityMockData)
  }, [])
  
  const handleOnCardClick = () => {

  } 

  return (
    <Layout pageTitle={'台灣旅遊景點導覽 - 首頁'} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"}>
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
                activities.map(activity => {
                  return(
                    <Card 
                      key={activity.Name}
                      onClick={() => handleOnCardClick()} 
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
                foods.map(food => {
                  return(
                    <Card 
                      key={food.Name}
                      onClick={() => handleOnCardClick()} 
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
