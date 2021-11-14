import { useState } from "react"
import Router from 'next/router'
import Image from 'next/image';
import { SearchState, SearchBusState } from '../../types/states'
import Inputboxs from '../inputbox/inputbox'
import Buttons from '../buttons/buttons'
import Dropdowns from '../dropdown/dropdown'
import seachIcon from '../../../public/images/search_icon.png'
import textLogoCircle from '../../../public/images/text_logo_circle.png'
import textLogoSquare from '../../../public/images/text_logo_square.png'
import textLogoI from '../../../public/images/text_logo_i.png'
import textLogoTriangle from '../../../public/images/text_logo_triangle.png'
import locationIcon from '../../../public/images/location_icon.png'
import sharedStyles from '../../shared/Shared.module.scss'
import headerStyles from './Header.module.scss'
import { CityData, ScenicspotCategoryData, FoodCategoryData, BusData } from "../../constants"
import { HeaderProps } from '../../types/components'
import { useTourisms } from "../../context/tourismProvider"; //Activity

const Header = ({label, hasTab, onClick, onSearch, value, tabdata}: HeaderProps) => {
    const { addSearch, search, searchbus } = useTourisms() 
    const [searchs, setSearchs] = useState<SearchState>({
        keyword: search.keyword,
        category: search.category, 
        city: search.city,
    })
    const [searchsBus, setSearchsBus] = useState<SearchBusState>({
        city: searchbus.city,
        route: searchbus.route,
    })
    const [error, setError] = useState('')
    const handleOnInputChange = (value: string) => {
        setSearchs({...searchs, keyword: value}) // e.currentTarget.value
    };
    const handleOnTabChange = (index:number) => {
        if(onClick) onClick(index)
    }
    const handleOnSubmit = () => {
        if(label === 'transportation'){
            if(onSearch) onSearch(searchsBus.city, searchsBus.route)
        } else {
            if(searchs.category === ''){
                setTimeout(()=> {
                    setError('')
                },3000)
                setError('類別必填')
            } else {
                addSearch({
                    keyword: searchs.keyword,
                    city: searchs.city ? searchs.city : '', 
                    category: searchs.category, 
                })
                if(searchs.keyword.length !== 0){
                    Router.push({
                        pathname: `/${label}/search`,
                        query: { 
                            keyword: searchs.keyword,
                            city: searchs.city ? searchs.city : 'all', 
                            category: searchs.category, 
                            page: 1
                        },
                    })
                } else {
                    Router.push({
                        pathname: `/${label}/search`,
                        query: { 
                            city:searchs.city ? searchs.city : 'all', 
                            category: searchs.category, 
                            page: 1
                        },
                    })
                }
            }
        }
    }

    const handleOnGetLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
            if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(function(position) {
                });
                //If granted then you can directly call your function here
            } else if (result.state === "prompt") {
            } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
            };
            });
          } else {
          }
    }

    const handleOnDropDownChange = (name: string, value: string) => {
        setSearchs({...searchs, [name]: value}) // e.currentTarget.value
    };
    const handleOnDropDownBusChange = (name: string, value: string) => {
        setSearchsBus({...searchsBus, [name]: value}) // e.currentTarget.value
    };

    return(
        <div className={`${headerStyles['wrapper']} ${headerStyles[`${label !== 'transportation' ? 'basic' : 'tp'}`]}`}>
            { 
                error.length !== 0 && <div className={headerStyles['error-container']}>{error}</div>
            }
            {
                label !== 'transportation' ?
                <div className={headerStyles['wrapper-background']}>
                    <div className={headerStyles['container']}>
                        <h1 className={headerStyles['title']}>
                            Welc
                            <span className={headerStyles['text-logo']}><Image src={textLogoCircle} alt={'Text Logo'} width={36} height={36}/></span>me t
                            <span className={headerStyles['text-logo']}><Image src={textLogoSquare} alt={'Text Logo'} width={36} height={36}/></span> 
                            <span className={headerStyles['text-logo-compose']}>Ta
                                <span className={headerStyles['text-logo-compose__bottom']}><Image src={textLogoI} alt={'Text Logo'} width={14} height={33}/></span>
                                <span className={headerStyles['text-logo-compose__top']}><Image src={textLogoTriangle} alt={'Text Logo'} width={20} height={20}/></span>
                                <span className={headerStyles['text-logo-compose__right']}>wan</span>
                            </span>
                        </h1>
                        <p className={headerStyles['subtitle']}>台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
                        <div className={headerStyles['search-form']}>
                            <div className={`${sharedStyles['flex-row']} ${sharedStyles['justify-content-between']}`}>
                                <Inputboxs 
                                    defaultValue={search.keyword} 
                                    type='text' 
                                    name='keyword' 
                                    required={false} 
                                    onChange={handleOnInputChange} 
                                    placeholder='搜尋關鍵字' 
                                    classname='search-input' 
                                />
                                <div className={headerStyles['button-container']}>
                                    <Buttons 
                                        imagePath={seachIcon} 
                                        imageAlt={'Searcn by keyword'} 
                                        backgroundColor={'pink'} 
                                        ariaLabel={'Searcn by keyword'} 
                                        onClick={handleOnSubmit} 
                                        type={'image'}
                                    />
                                </div>
                            </div>
                            <div className={`${sharedStyles['flex-row']} ${sharedStyles['justify-content-between']}`}>
                                <Dropdowns 
                                    defaultValue={search.category === '' ? 
                                        label === 'scenicspot-and-activity' ? 
                                            ScenicspotCategoryData.defaultValue.value 
                                            : 
                                            FoodCategoryData.defaultValue.value 
                                        : 
                                        search.category} 
                                    defaultLabel={search.category === '' ? 
                                        label === 'scenicspot-and-activity' ?  
                                            ScenicspotCategoryData.defaultValue.label 
                                            : 
                                            FoodCategoryData.defaultValue.label 
                                        : 
                                        label === 'scenicspot-and-activity' ? 
                                            ScenicspotCategoryData.listing.filter(item => item.value === search.category)[0].label 
                                            : 
                                            FoodCategoryData.listing.filter(item => item.value === search.category)[0].label}
                                    data={label === 'scenicspot-and-activity' ? ScenicspotCategoryData : FoodCategoryData} 
                                    onClick={handleOnDropDownChange} 
                                    type={"category"}
                                />
                                <Dropdowns 
                                    defaultLabel={search.city === '' ? CityData.defaultValue.label : CityData.listing.filter(city => city.value === search.city)[0].label} 
                                    defaultValue={search.city === '' ? '' : search.city}
                                    data={CityData} 
                                    onClick={handleOnDropDownChange} 
                                    type={"city"}
                                />
                                <div className={headerStyles['button-container']}>
                                    <Buttons 
                                        imagePath={locationIcon} 
                                        imageAlt={'Get current location'} 
                                        backgroundColor={'yellow'} 
                                        ariaLabel={'Get current location'} 
                                        onClick={handleOnGetLocation} 
                                        type={'image'}
                                        disable={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={headerStyles['tp-container']}>
                    <div className={headerStyles['tp-container--top']}>
                        <Dropdowns 
                            defaultValue={''} 
                            defaultLabel={'選擇縣市'}
                            arrayData={Array.from(BusData).map(([name, value]) => name)} 
                            onClick={handleOnDropDownBusChange} 
                            type={"city"}
                            label={'tp'}
                        />
                        <Dropdowns 
                            defaultLabel={searchsBus.route === '' ? '選擇路線' : searchsBus.route} 
                            defaultValue={searchsBus.route === '' ? '' : searchsBus.route}
                            arrayData={BusData.get(searchsBus.city) || []} 
                            onClick={handleOnDropDownBusChange} 
                            type={"route"}
                            label={'tp'}
                        />
                        <div className={headerStyles['button-container']}>
                            <Buttons 
                                imagePath={seachIcon} 
                                imageAlt={'Searcn by keyword'} 
                                backgroundColor={'pink'} 
                                ariaLabel={'Searcn by keyword'} 
                                onClick={handleOnSubmit} 
                                type={'image'}
                            />
                        </div>
                    </div>
                    <div className={headerStyles['tp-container--bottom']}>
                        {
                            tabdata && tabdata.map((item, index)=> {
                                return (
                                    <div key={item+index} className={`${headerStyles.tabItem} ${index === value && headerStyles.actived}`} onClick={() => handleOnTabChange(index)}>
                                        往<span> {item}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Header;