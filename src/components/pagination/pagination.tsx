import { useState } from "react";
import Buttons from "../buttons/buttons";
import { Pagination } from "../../types/components"
import styles from "./Pagination.module.scss"
import previousIcon from "../../../public/images/previous_icon_white.png"
import nextIcon from "../../../public/images/next_icon.png"
const Paginations = ({dataLength, pageSize, onClick, currentPage}: Pagination) => {
    const totalPage = Math.ceil(dataLength/pageSize)
    // const totalPage = 30
    const pageNumber: any[] = [];
    if(totalPage < 10){
        for(let i = 2; i< totalPage; i++){
            pageNumber.push(i)
        }
    }else{
        if(currentPage + 5 >= totalPage){
            for(let i = totalPage - 6; i< totalPage; i++){
                pageNumber.push(i)
            }
        }else if(currentPage - 6 < 1){
            for(let i = 2; i< 8; i++){
                pageNumber.push(i)
            }
        } else {
            for(let i = currentPage > 3 ? currentPage - 2 : 2 ; i<= currentPage + 2; i++){
                pageNumber.push(i)
            }
        }
    }
    
    const renderPagination = () => {
        return(
            <>
                <li id={'1'} className={`${styles.item} ${currentPage === 1 && styles.active}`}>{1}</li>
                {
                    currentPage - 6 >= 1 && <li>&#8230;</li> 
                }
                {pageNumber.map(item => {
                    return(
                            <li id={item} key={item} className={`${styles.item} ${item === currentPage && styles.active}`}>{item}</li>                      
                    )
                })}
                {
                    currentPage + 5 < totalPage && <li>&#8230;</li> 
                }
                <li id={totalPage.toString()} className={`${styles.item} ${currentPage === totalPage && styles.active}`}>{totalPage}</li>
            </>
        )
    }

    const handleOnChangePage = (e:any) =>{
        if(onClick && e.target.id) onClick(parseInt(e.target.id))
    }

    const handleOnChangeButton = (val: number) =>{
        if(onClick) onClick(currentPage+val)
    }

    return(
            dataLength > pageSize ? 
            <div className={styles.wrapper}>
                {currentPage !== 1 && 
                    <div className={`${styles['button-container']} ${styles['previous']}`}>
                        <Buttons type={'image'} imagePath={previousIcon} backgroundColor={"black"} onClick={() => handleOnChangeButton(-1)}/>
                    </div>
                }
                <ul  className={styles.container} onClick={(e) => handleOnChangePage(e)}>

                {
                    renderPagination()
                }
            
                </ul>
                {currentPage !== totalPage && 
                    <div className={`${styles['button-container']} ${styles['next']}`}>
                        <Buttons type={'image'} imagePath={nextIcon} backgroundColor={"pink"} onClick={() => handleOnChangeButton(1)}/>
                    </div>
                }
            </div> :
            null   
    )
}

export default Paginations;