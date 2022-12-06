import type { NextPage } from 'next'
import Image from 'next/legacy/image';
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
// import { useFetch } from '../../hooks/usefetch'
import loadingIcon from '../../../public/newloading.json'

// todo state type 
const ScenicspotSearchPage: NextPage = () => {
    const router = useRouter()
    const {keyword, page, category, city} = router.query
    const {loading, activities, scenicspots, addActivities, addScenicspots, addLoading } = useTourisms() 
    const [showModal, setShowModal] = useState<any>({
        index: 0,
        show: false,
        data: {}
    })
    const cityLength = router.isReady ? (city as string).split(' ').length : 0
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
                GetAuthorizationHeader()
                .then((token: any) => {
                    if(cityLength > 1){
                        let promises = (city as string).split(' ').map(async obj => {
                            return await API.get(
                                encodeURI(`/${category}${obj && `/${obj}`}?${keyword ? `$filter=contains(ScenicSpotName,'${keyword}')&` : ''}$format=JSON`),
                                {
                                    headers: {
                                        "authorization": "Bearer " + token,
                                    }
                                }
                            );
                        })
                        addLoading(true)
                        Promise.all(promises)
                        .then((data) => {
                            const newArray: any[] = []
                            data.forEach((item: any) => {
                                newArray.push(...item.data)
                            }) 
                            addScenicspots(city as string, newArray as [])
                            addLoading(false)
                        })
                    } else if(cityLength === 1){
                        addLoading(true)
                        API.get( 
                            encodeURI(`/${category}${(city && city !== 'all') ? `/${city}` : ''}?${keyword ? `$filter=contains(ScenicSpotName,'${keyword}')&` : ''}$format=JSON`),
                            {
                                headers: {
                                    "authorization": "Bearer " + token,
                                }
                            }
                        )
                        .then((data: any) => {
                            console.log('data,', data)
                            if(category ==='ScenicSpot'){
                                addScenicspots(city as string, data.data)
                            } else {
                                addActivities(city as string, data.data)
                            }
                            addLoading(false)
                        })   
                    }
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
    IE does not support find()
    */
    const labelArray = CityData.listing.filter(obj => {
        if(cityLength > 1)  return (city as string).split(' ').indexOf(obj.value) > -1
        return obj.value === city
    })
    const label = cityLength > 1 ? labelArray.map(item => item.label).join(', ') : labelArray[0]?.label || ""

    const handleOnCardClick = (index: number) => {
        setShowModal({
            index: index,
            show: !showModal.show,
            data: category ==='ScenicSpot' ? scenicspots.listing[index] : activities.listing[index]
        })
    }

    const handleOnChangePage = (val: number) => {
        if(keyword){
            Router.push({
                pathname: '/scenicspot-and-activity/search',
                query: { 
                    keyword: keyword,
                    city: city, 
                    category: category, 
                    page: val 
                },
            })
        } else {
            Router.push({
                pathname: '/scenicspot-and-activity/search',
                query: { 
                    city: city, 
                    category: category, 
                    page: val 
                },
            })
        }
    }
    return(
        <Layout 
            pageTitle={`${label}熱門${category ==='ScenicSpot' ? '景點' : '活動'}`} 
            description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} 
            previewImage={"/images/preview_image_homepage.png"}
        >
            {showModal.show && 
                <Modal 
                    show={showModal.show}
                    index={showModal.index} 
                    onClick={(val: number) => handleOnCardClick(val)}
                    onCancel={()=> setShowModal({...showModal, show: false})}
                    title={category ==='ScenicSpot' ? showModal.data.ScenicSpotName : showModal.data.ActivityName}
                    description={showModal.data.Description ? showModal.data.Description: showModal.data.DescriptionDetail}
                    time={category ==='ScenicSpot' ? showModal.data.OpenTime ? showModal.data.OpenTime : '--' : `${format(Date.parse(showModal.data.StartTime), 'yyyy/MM/dd')} - ${format(Date.parse(showModal.data.EndTime), 'yyyy/MM/dd')}`} 
                    ticket={category ==='ScenicSpot' ? `${showModal.data.TicketInfo ? showModal.data.TicketInfo : '--'}` : `${showModal.data.Charge ? showModal.data.Charge : '--'}`}  
                    location={category ==='ScenicSpot' ? showModal.data.Address ? showModal.data.Address : `${showModal.data.City} ${showModal.data.ZipCode ? postcal.get(showModal.data.ZipCode.slice(0, 3)) : [""]}` : `${showModal.data.Location} ${showModal.data.Address}`}  
                    phoneNumber={showModal.data.Phone ? showModal.data.Phone : '--'} 
                    imagePath={showModal.data.Picture?.PictureUrl1 ? showModal.data.Picture: "/images/no_image_available.png"}
                    imageAlt={showModal.data.Picture?.PictureDescription1 ? showModal.data.Picture?.PictureDescription1 : 'Modal Image'}
                />
            }
            <Header label={'scenicspot-and-activity'}/>
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
                                <div className={`${styles['scenicspot-wrapper']} ${((category === 'Activity' && activities.listing.length === 0) || (category === 'ScenicSpot' && scenicspots.listing.length === 0)) && styles['result-none']}`}>
                                    {
                                        ((category === 'Activity' && activities.listing.length === 0) || (category === 'ScenicSpot' && scenicspots.listing.length === 0)) &&
                                        <div className={styles['result-none-container']}>
                                            No Result Found
                                        </div>
                                    }
                                    {
                                    category === 'Activity' ? 
                                        activities.listing.slice((pages - 1)*20, (pages*20)).map((activity: any, index: number) => {
                                            return(
                                                <Card 
                                                    key={activity.ActivityName  + ((pages - 1)*20 + index)}
                                                    onClick={() => handleOnCardClick((pages - 1)*20 + index)} 
                                                    type={'small'} 
                                                    name={activity.ActivityName} 
                                                    description={activity.DescriptionDetail} 
                                                    location={`${activity.Location}`} 
                                                    imagePath={activity.Picture.PictureUrl1 ? activity.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                                                    imageAlt={activity.Picture.PictureDescription1 !== 0 ? activity.Picture.PictureDescription1 : "Activity Image"}
                                                />
                                            )
                                        })
                                        :
                                        scenicspots.listing.slice((pages - 1)*20, (pages*20)).map((scenicspot: any, index: number) => {
                                            const areaName = scenicspot['ZipCode'] ? postcal.get(scenicspot.ZipCode.slice(0, 3)) : [""]
                                            return(
                                                <Card 
                                                key={scenicspot.ScenicSpotName + ((pages - 1)*20 + index)}
                                                onClick={() => handleOnCardClick((pages - 1)*20 + index)} 
                                                type={'small'} 
                                                name={scenicspot.ScenicSpotName} 
                                                description={scenicspot.DescriptionDetail} 
                                                location={`${scenicspot.City? `${scenicspot.City} ${areaName && areaName[0]}` : scenicspot.Address}`} 
                                                imagePath={scenicspot.Picture.PictureUrl1 ? scenicspot.Picture.PictureUrl1 : "/images/no_image_available.png"} 
                                                imageAlt={scenicspot.Picture.PictureDescription1 !== 0 ? scenicspot.Picture.PictureDescription1 : "Scenicspot Image"}
                                            />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Paginations currentPage={pages} dataLength={category ==='ScenicSpot' ? scenicspots.listing.length : activities.listing.length} pageSize={20} onClick={handleOnChangePage}/>
                        </article>
                    </section>
                </>
            }
        </Layout>
    )
}

export default ScenicspotSearchPage