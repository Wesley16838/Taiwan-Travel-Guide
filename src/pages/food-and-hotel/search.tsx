import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Router, { useRouter } from 'next/router'
import Lottie from 'react-lottie';
import Layout from '../../components/layout/layout'
import Header from '../../components/header/header'
import Card from '../../components/card/card'
import Modal from '../../components/modal/modal'
import Paginations from '../../components/pagination/pagination'
import styles from '../../../styles/Page.module.scss'
import API, { GetAuthorizationHeader } from '../../api' // remove later
import { postcal, CityData } from '../../constants'
import { useTourisms } from "../../context/tourismProvider"; //Activity
import { useFetch } from '../../hooks/usefetch'
import loadingIcon from '../../../public/newloading.json'

// category
const FoodAndHotelSearchPage: NextPage = () => {
    const router = useRouter()
    const {keyword, page, category, city} = router.query
    const {loading, restaurants, hotels, addRestaurants, addHotels, addLoading } = useTourisms() 
    const [showModal, setShowModal] = useState<any>({
        index: 0,
        show: false,
        data: {}
    })

    const pages = parseInt(page as string, 10)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingIcon,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      useEffect(()=> {
        const loadData = () => {
            try{ 
                addLoading(true)
                GetAuthorizationHeader()
                .then((token: any) => {
                    API.get( encodeURI(`/${category}${(city && city !== 'all') ? `/${city}` : ''}?${keyword ? `$filter=contains(Name,'${keyword}')&` : ''}$format=JSON`),
                    {
                        headers: {
                            "authorization": "Bearer " + token,
                        }
                    })
                    .then((data: any) => {
                        console.log('dataaa,', data)
                        if(category ==='Restaurant'){
                            addRestaurants(city as string, data.data)
                        } else {
                            addHotels(city as string, data.data)
                        }
                        addLoading(false)
                    })   
                })
            }catch(err){
                addLoading(false)

                // Handle Error Message here
                console.log('err,', err)
            }
        }
        if(router.isReady) loadData()
    }, [city, category, keyword])
   
   
    /*
    / IE does not support find()
    */
    const labelArray = CityData.listing.filter(obj => {
        return obj.value === city
    })

    const label = labelArray[0]?.label || ""

    const handleOnCardClick = (index: number) => {
        setShowModal({
            index: index,
            show: !showModal.show,
            data: category ==='Restaurant' ? restaurants.listing[index] : hotels.listing[index]
        })
    }

    const handleOnChangePage = (val: number) => {
        if(keyword){
            Router.push({
                pathname: '/food-and-hotel/search',
                query: { 
                    keyword: keyword,
                    city: city, 
                    category: category, 
                    page: val 
                },
            })
        } else {
            Router.push({
                pathname: '/food-and-hotel/search',
                query: { 
                    city: city, 
                    category: category, 
                    page: val 
                },
            })
        }
    }

    return(
        <Layout pageTitle={`${label}熱門住宿和美食`} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"}>
        {showModal.show && 
            <Modal 
                show={showModal.show}
                index={showModal.index} 
                onClick={(val: number) => handleOnCardClick(val)}
                onCancel={()=> setShowModal({...showModal, show: false})}
                title={category ==='Restaurant' ? showModal.data.RestaurantName : showModal.data.HotelName}
                description={showModal.data.Description}
                time={category ==='Restaurant' ? showModal.data.OpenTime : `--`} 
                ticket={'--'}  
                location={showModal.data.Address ? showModal.data.Address : '--'}  
                phoneNumber={showModal.data.Phone ? showModal.data.Phone : '--'} 
                imagePath={showModal.data.Picture?.PictureUrl1 ? showModal.data.Picture: "/images/no_image_available.png"}
                imageAlt={showModal.data.Picture?.PictureDescription1 ? showModal.data.Picture?.PictureDescription1 : 'Modal Image'}
            />
        }
        <Header label={'food-and-hotel'}/>
        {
            loading ?
            <div className={styles['loading-container']}>
                <Lottie 
                    options={defaultOptions}
                    height={74}
                    width={74}
                />
            </div>
            :
            <>
                <section>
                    <article className={styles['page-article']}>
                        <div className={styles.topic}>
                            <h2>{city !== 'all' ? label : '不分地區'}</h2>
                            <div className={`${styles['scenicspot-wrapper']} ${((category === 'Restaurant' && restaurants.listing.length === 0) || (category === 'Hotel' && hotels.listing.length === 0)) && styles['result-none']}`}>
                                {
                                    ((category === 'Restaurant' && restaurants.listing.length === 0) || (category === 'Hotel' && hotels.listing.length === 0)) &&
                                    <div className={styles['result-none-container']}>
                                        No Result Found
                                    </div>
                                }
                                {
                                category === 'Restaurant' ? 
                                    restaurants.listing.slice((pages - 1)*20, (pages*20)).map((restaurant: any, index: number) => {
                                        return(
                                            <Card 
                                            key={restaurant.RestaurantName + ((pages - 1)*20 + index)}
                                            onClick={() => handleOnCardClick((pages - 1)*20 + index)} 
                                            type={'small'} 
                                            name={restaurant.RestaurantName} 
                                            description={restaurant.Description} 
                                            location={`${restaurant.Address}`} 
                                            imagePath={restaurant.Picture.PictureUrl1 ? restaurant.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                                            imageAlt={restaurant.Picture.PictureDescription1 !== 0 ? restaurant.Picture.PictureDescription1 : "Restaurant Image"}
                                        />
                                        )
                                    })
                                    :
                                    hotels.listing.slice((pages - 1)*20, (pages*20)).map((hotel: any, index: number) => {
                                        const areaName = hotel['ZipCode'] ? postcal.get(hotel.ZipCode.slice(0, 3)) : [""]
                                        return(
                                            <Card 
                                            key={hotel.HotelName + ((pages - 1)*20 + index)}
                                            onClick={() => handleOnCardClick((pages - 1)*20 + index)} 
                                            type={'small'} 
                                            name={hotel.HotelName} 
                                            description={hotel.Description} 
                                            location={`${hotel.City? `${hotel.City} ${areaName && areaName[0]}` : hotel.Address}`} 
                                            imagePath={hotel.Picture.PictureUrl1 ? hotel.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                                            imageAlt={hotel.Picture.PictureDescription1 !== 0 ? hotel.Picture.PictureDescription1 : "Scenicspot Image"}
                                        />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Paginations currentPage={pages} dataLength={category ==='Restaurant' ? restaurants.listing.length : hotels.listing.length} pageSize={20} onClick={handleOnChangePage}/>
                    </article>
                </section>
            </>
        }
    </Layout>
    )
}

export default FoodAndHotelSearchPage;