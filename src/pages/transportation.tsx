import type { NextPage } from 'next'
import Layout from '../components/layout/layout'
import Header from '../components/header/header'
import styles from '../../styles/Page.module.scss'
import API, { GetAuthorizationHeader } from '../api' // remove later
import { useTourisms } from "../context/tourismProvider"; //Activity
import { useEffect, useState } from 'react'
import loadingIcon from '../../public/newloading.json'
import Lottie from 'react-lottie';

const TransportationPage: NextPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingIcon,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    const [search, setSearch] = useState({
        city: '',
        route: '',
    })

    const [goStops, setGoStops] = useState<any>([])
    const [backStops, setBackStops] = useState<any>([])
    const [direction, setDirection] = useState(0)
    const {loading, addLoading, addSearchBus } = useTourisms() 
    const handleOnSearch = (name: string, value: string) => {
        setSearch({city: name, route: value})
        addSearchBus({city: name, route: value})
    }
    
    useEffect(()=> {
        const loadData = async () => {
            try{ 
                const date = new Date()
                const minutes = date.getMinutes();
                const hour = date.getHours();
                addLoading(true)
                let maximunGoStops:any = [];
                let maximunBackStops:any = [];
                GetAuthorizationHeader()
                .then(async (token: any) => {
                    const res:any = await Promise.all([
                        API.get(encodeURI(`/Bus/StopOfRoute/TaiwanTrip/${search.route}?$format=JSON`),{
                            headers: {
                                "authorization": "Bearer " + token,
                            }
                        }),
                        API.get(encodeURI(`/Bus/EstimatedTimeOfArrival/TaiwanTrip/${search.route}?$format=JSON`),{
                            headers: {
                                "authorization": "Bearer " + token,
                            }
                        }),
                        API.get(encodeURI(`/Bus/RealTimeNearStop/TaiwanTrip/${search.route}?$format=JSON`),{
                            headers: {
                                "authorization": "Bearer " + token,
                            }
                        })
                    ])
                    const nearStopArray = res[2].data.map((stop: any) => stop.StopName['Zh_tw'])
                    res[0].data.forEach((item: any, index: number) => {
                        if(item.Direction === 1){
                            if(maximunBackStops.length<item.Stops.length){
                                item.Stops.forEach((innerItem: any, index: number) => {
                                    const obj = res[1].data.filter((item:any) => innerItem.StopName['Zh_tw'] === item.StopName['Zh_tw'])[0]
                                    let busStatus = ""
                                    switch(obj.StopStatus){
                                        case 0:
                                            if(nearStopArray.indexOf(innerItem.StopName['Zh_tw']) !== -1 && res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].Direction === 1){
                                                busStatus = res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].A2EventType === 0 ? '離站中' : '進站中'
                                            }else{
                                                if(obj.EstimateTime){
                                                    const hr = Math.floor(obj.EstimateTime / 3600)
        
                                                    const min = Math.floor((obj.EstimateTime - 3600*hr) / 60)
        
                                                    const carry = Math.floor((minutes+Math.floor(min)) / 60)
        
                                                    busStatus = `${hour+hr+carry} : ${minutes+min-carry*60<10 ? 0: ''}${minutes+min-carry*60}`;
                                                } else {
                                                    // unknown error
                                                    busStatus = "不明";
                                                }
                                            }
                                            
                                            
                                            break;
                                        case 1: 
                                            if(nearStopArray.indexOf(innerItem.StopName['Zh_tw']) !== -1 && res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].Direction === 1){
                                                busStatus = res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].A2EventType === 0 ? '離站中' : '進站中'
                                            }else{
                                                if(obj.EstimateTime){
                                                    const hr = Math.floor(obj.EstimateTime / 3600)
        
                                                    const min = Math.floor((obj.EstimateTime - 3600*hr) / 60)
        
                                                    const carry = Math.floor((minutes+Math.floor(min)) / 60)
        
                                                    busStatus = `${hour+hr+carry} : ${minutes+min-carry*60<10 ? 0: ''}${minutes+min-carry*60}`;
                                                }else{
                                                    busStatus = "尚未發車";
                                                }
                                            }
                                            break;
                                        case 2:
                                            busStatus = "交管不停靠";
                                            break;
                                        case 3:
                                            busStatus = "末班車已過";
                                            break;
                                        case 4:
                                            busStatus = "今日不營運";
                                            break;
                                    }
                                    maximunBackStops.push({name: innerItem.StopName['Zh_tw'], status: busStatus})
                                })
                            }
                        } else if(item.Direction === 0) {
                            if(maximunGoStops.length<item.Stops.length){
                                item.Stops.forEach((innerItem: any) => {
                                    const obj = res[1].data.filter((item:any) => innerItem.StopName['Zh_tw'] === item.StopName['Zh_tw'])[0]
                                    let busStatus = ""
                                    switch(obj.StopStatus){
                                        case 0:
                                            if(nearStopArray.indexOf(innerItem.StopName['Zh_tw']) !== -1 && res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].Direction === 1){
                                                busStatus = res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].A2EventType === 0 ? '離站中' : '進站中'
                                            }else{
                                                if(obj.EstimateTime){
                                                    const hr = Math.floor(obj.EstimateTime / 3600)
        
                                                    const min = Math.floor((obj.EstimateTime - 3600*hr) / 60)
        
                                                    const carry = Math.floor((minutes+Math.floor(min)) / 60)
        
                                                    busStatus = `${hour+hr+carry} : ${minutes+min-carry*60<10 ? 0: ''}${minutes+min-carry*60}`;
                                                } else {
                                                    // unknown error
                                                    busStatus = "不明";
                                                }
                                            }
                                            break;
                                        case 1: 
                                            if(nearStopArray.indexOf(innerItem.StopName['Zh_tw']) !== -1 && res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].Direction === 1){
                                                busStatus = res[2].data[nearStopArray.indexOf(innerItem.StopName['Zh_tw'])].A2EventType === 0 ? '離站中' : '進站中'
                                            }else{
                                                if(obj.EstimateTime){
                                                    const hr = Math.floor(obj.EstimateTime / 3600)
        
                                                    const min = Math.floor((obj.EstimateTime - 3600*hr) / 60)
        
                                                    const carry = Math.floor((minutes+Math.floor(min)) / 60)
        
                                                    busStatus = `${hour+hr+carry} : ${minutes+min-carry*60<10 ? 0: ''}${minutes+min-carry*60}`;
                                                }else{
                                                    busStatus = "尚未發車";
                                                }
                                            }
                                            break;
                                        case 2:
                                            busStatus = "交管不停靠";
                                            break;
                                        case 3:
                                            busStatus = "末班車已過";
                                            break;
                                        case 4:
                                            busStatus = "今日不營運";
                                            break;
                                    }
                                    maximunGoStops.push({name: innerItem.StopName['Zh_tw'], status: busStatus})
                                })
                            }
                        }
                    })
                    setGoStops(maximunGoStops);
                    setBackStops(maximunBackStops);
                    addLoading(false)
                })
            }catch(err){
                addLoading(false)

                // Handle Error Message here
                console.log('err,', err)
            }
        }
        let interval: any = null
        if(search.route !==''){
            interval = setInterval(function load(){
                loadData()
                return load;
            }(), 15000);
        }
        return (
            ()=> {
                interval!==null && clearTimeout(interval)
            }
        )
    }, [search])
    const renderArray = direction===0 ? goStops : backStops
    console.log('renderStops', renderArray);
    const stopLength = renderArray.length
    return(
        <Layout pageTitle={`景點交通`} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"}>
            <Header label={'transportation'} onSearch={handleOnSearch} hasTab={true} value={direction} onClick={setDirection} tabdata={[`${search.route === '' ? '--' : goStops.length!== 0 ? goStops[goStops.length - 1].name : '--'}`, `${search.route === '' ? '--' : backStops.length !== 0 ? backStops[backStops.length - 1].name : '--'}`]}/>
            <div className={`${styles['wrapper-tp']} ${stopLength === 0 && styles['no-result']}`}>
                <p className={styles.warning}>*每隔 15 秒自動更新</p>
                <div className={`${styles['container-tp']} ${stopLength === 0 && styles['no-result']}`}>
                    {
                        (stopLength === 0 && !loading) && <p className={styles.notice}>請選擇公車路線</p>
                    }
                    {
                        loading && 
                        <div className={styles['loading-container']}>
                            <Lottie 
                                options={defaultOptions}
                                height={74}
                                width={74}
                            />
                        </div>

                    }
                    {
                        !loading && 
                            stopLength>12 ? 
                            <div className={styles['left-container-tp']}>
                                {
                                    renderArray.slice(0, stopLength).map((stop: any, index: number) => {
                                        let customClassName = "";
                                        switch(stop.status){
                                            case "尚未發車":
                                            case "交管不停靠":
                                            case "末班車已過":
                                            case "今日不營運":
                                                customClassName = "none";
                                                break;
                                            case "進站中":
                                                customClassName = "begin";
                                                break;
                                            case "離站中":
                                                customClassName = "end";
                                                break;
                                            case "不明":
                                                customClassName = "error";
                                                break;
                                            default:
                                                customClassName = "basic";
                                                break;
                                        }
                                        return(
                                            <div className={`${styles['item-tp']}`} key={stop.name+index}>
                                                <div className={`${styles.status} ${styles[customClassName]}`}>
                                                    {stop.status}
                                                </div>
                                                <p className={styles.name}>
                                                    {stop.name}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : 
                            <div className={styles['left-container-tp']}>
                                {
                                    renderArray.map((stop: any, index: number) => {
                                        let customClassName = "";
                                        switch(stop.status){
                                            case "尚未發車":
                                            case "交管不停靠":
                                            case "末班車已過":
                                            case "今日不營運":
                                                customClassName = "none";
                                                break;
                                            case "進站中":
                                                customClassName = "begin";
                                                break;
                                            case "離站中":
                                                customClassName = "end";
                                                break;
                                            case "不明":
                                                customClassName = "error";
                                                break;
                                            default:
                                                customClassName = "basic";
                                                break;
                                        }
                                        return(
                                            <div className={`${styles['item-tp']} ${styles['single-line']}`} key={stop.name+index}>
                                                <div className={`${styles.status} ${styles[customClassName]}`}>
                                                    {stop.status}
                                                </div>
                                                <p className={styles.name}>
                                                    {stop.name}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                    
                    {
                        // (stopLength>12 && !loading) && 
                        // <div className={styles['right-container-tp']}>
                        //     {
                        //         renderArray.slice(stopLength/2 + 1, stopLength).map((stop: any, index: number) => {
                        //             let customClassName = "";
                        //             switch(stop.status){
                        //                 case "尚未發車":
                        //                 case "交管不停靠":
                        //                 case "末班車已過":
                        //                 case "今日不營運":
                        //                     customClassName = "none";
                        //                     break;
                        //                 case "進站中":
                        //                     customClassName = "begin";
                        //                     break;
                        //                 case "離站中":
                        //                     customClassName = "end";
                        //                     break;
                        //                 case "不明":
                        //                     customClassName = "error";
                        //                     break;
                        //                 default:
                        //                     customClassName = "basic";
                        //                     break;
                        //             }
                        //             return(
                        //                 <div className={`${styles['item-tp']}`} key={stop.name+(index+stopLength/2 + 1)}>
                        //                     <div className={`${styles.status} ${styles[customClassName]}`}>
                        //                         {stop.status}
                        //                     </div>
                        //                     <p className={styles.name}>
                        //                         {stop.name}
                        //                     </p>
                        //                 </div>
                        //             )
                        //         })
                        //     }
                        // </div>
                    }
                </div>
            </div>
           
            
        </Layout>
    )
}

export default TransportationPage