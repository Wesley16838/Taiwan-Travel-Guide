import { useState } from "react"
import {useRouter} from 'next/router'
import { SearchState } from '../../types/states'
import Inputboxs from '../inputbox/inputbox'
import Buttons from '../buttons/buttons'
import Dropdowns from '../dropdown/dropdown'
import seachIcon from '../../../public/images/search_icon.png'
import locationIcon from '../../../public/images/location_icon.png'
import sharedStyles from '../../shared/Shared.module.scss'
import headerStyles from './Header.module.scss'
import { CityData, MainCategoryData } from "../../constants"
const Header = () => {
    const router = useRouter()
    const [search, setSearch] = useState<SearchState>({
        keyword: '',
        category: '', 
        city: '',
    })
   
    const handleOnInputChange = (value: string) => {
        setSearch({...search, keyword: value}) // e.currentTarget.value
    };

    const handleOnSubmit = () => {
        router.push({
            pathname: `/search/${search.category}`,
            query: {keyword: search.keyword, city: search.city},
        })
    }

    const handleOnGetLocation = () => {
        console.log('Get Location')
    }

    const handleOnDropDownChange = (name: string, value: string) => {
        setSearch({...search, [name]: value}) // e.currentTarget.value
    };

    return(
        <div className={headerStyles['wrapper']}>
            <div className={headerStyles['wrapper-background']}>
                <div className={headerStyles['container']}>
                    <h1 className={headerStyles['title']}>Welcome to <span>Taiwan°</span></h1>
                    <p className={headerStyles['subtitle']}>台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
                    <div className={headerStyles['search-form']}>
                        <div className={`${sharedStyles['flex-row']} ${sharedStyles['justify-content-between']}`}>
                            <Inputboxs type='text' name='keyword' required={false} onChange={handleOnInputChange} placeholder='搜尋關鍵字' classname='search-input' />
                            <div className={headerStyles['button-container']}>
                                <Buttons imagePath={seachIcon} imageAlt={'Searcn by keyword'} backgroundColor={'pink'} ariaLabel={'Searcn by keyword'} onClick={handleOnSubmit} type={'image'}/>
                            </div>
                        </div>
                        <div className={`${sharedStyles['flex-row']} ${sharedStyles['justify-content-between']}`}>
                            <Dropdowns data={MainCategoryData} onClick={handleOnDropDownChange} type={"category"}/>
                            <Dropdowns data={CityData} onClick={handleOnDropDownChange} type={"city"}/>
                            <div className={headerStyles['button-container']}>
                                <Buttons imagePath={locationIcon} imageAlt={'Get current location'} backgroundColor={'yellow'} ariaLabel={'Get current location'} onClick={handleOnGetLocation} type={'image'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;