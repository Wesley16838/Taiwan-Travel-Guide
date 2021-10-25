import type { NextPage } from 'next'
import Layout from '../components/layout/layout'
import Navbar from '../components/navbar/navbar'
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
  const [food, setFood] = useState<any[]>([])

  useEffect(() => {
    setFood(FoodMockData)
    setActivities(ActivityMockData)
  }, [])
  
  const handleOnCardClick = () => {

  } 

  return (
    <Layout>
      <Navbar/>
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
                      imagePath={Object.keys(activity.Picture).length !== 0 ? activity.Picture.PictureUrl1 : "/no_image.png"} 
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
          </div>
        </article>
      </section>
    </Layout>
  )
}

export default Home
