import type { NextPage } from 'next'
import { format } from 'date-fns'
import Layout from '../../components/layout/layout'
import Header from '../../components/header/header'
import Card from '../../components/card/card'
import Modal from '../../components/modal/modal'
import styles from '../../../styles/Page.module.scss'
import { useEffect, useState } from 'react'
import { HotelState, FoodState } from '../../types/states'
import { FoodMockData, HotelMockData } from '../../constants/mock-data'

const FoodAndHotelPage: NextPage = () => {
    const [foods, setFood] = useState<FoodState[]>([])
    const [hotels, setHotels] = useState<HotelState[]>([])
    const [showModal, setShowModal] = useState<any>({
        type: '',
        show:false,
        data: {}
      })
    useEffect(() => {
        setFood(FoodMockData)
        setHotels(HotelMockData)
      }, [])

    const handleOnCardClick = (type: string, index: number) => {
    setShowModal({
        index: index,
        type: type,
        show: !showModal.show,
        data: type === 'food' ? foods[index] : hotels[index]
    })
    }
    return(
        <Layout pageTitle={`美食住宿`} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"}>
            {showModal.show && 
              <Modal 
                show={showModal.show}
                index={showModal.index} 
                onClick={(val: number) => handleOnCardClick(showModal.type, val)}
                onCancel={()=> setShowModal({...showModal, show: false})}
                title={showModal.data.Name}
                description={showModal.data.Description}
                time={showModal.type === 'food' ? showModal.data.OpenTime : '--'} 
                ticket={showModal.type === 'food' ? '--' : `${showModal.data.Charge ? showModal.data.Charge : '--'}`}  
                location={showModal.data.Location ? showModal.data.Location : showModal.data.Address}  
                phoneNumber={showModal.data.Phone ? showModal.data.Phone : '--'} 
                imagePath={showModal.data.Picture?.PictureUrl1 ? showModal.data.Picture : "/images/no_image_available.png"}
                imageAlt={showModal.data.Picture?.PictureDescription1 ? showModal.data.Picture?.PictureDescription1 : 'Modal Image'}
              />
            }
            <Header label={'food-and-hotel'}/>
            <section>
                <article className={styles['page-article']}>
                    <div className={styles.topic}>
                        <h2>熱門美食</h2>
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
                <article className={styles['page-article']}>
          <div className={styles.topic}>
            <h2>熱門住宿</h2>
            <div className={styles['food-wrapper-desktop']}>
              {
                hotels.slice(0,11).map((hotel, index) => {
                  return(
                    <Card 
                      key={hotel.Name}
                      onClick={() => handleOnCardClick('hotel', index)} 
                      type={'small'} 
                      name={hotel.Name} 
                      description={hotel.Description} 
                      location={hotel.Address} 
                      imagePath={Object.keys(hotel.Picture).length !== 0 ? hotel.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                      imageAlt={Object.keys(hotel.Picture).length !== 0 ? hotel.Picture.PictureDescription1 : "Activity Image"}
                    />
                  )
                })
              }
            </div>
            <div className={styles['food-wrapper']}>
              {
                hotels.map((hotel, index) => {
                  return(
                    <Card 
                      key={hotel.Name}
                      onClick={() => handleOnCardClick('hotel', index)} 
                      type={'small'} 
                      name={hotel.Name} 
                      description={hotel.Description} 
                      location={hotel.Address} 
                      imagePath={Object.keys(hotel.Picture).length !== 0 ? hotel.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                      imageAlt={Object.keys(hotel.Picture).length !== 0 ? hotel.Picture.PictureDescription1 : "Activity Image"}
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

export default FoodAndHotelPage;