import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/layout'

const ScenicspotPage: NextPage = () => {
    const router = useRouter()
    const {name, label} = router.query

    return(
        <Layout pageTitle={`台灣旅遊景點導覽 - ${label}熱門景點`} description={"全台觀光景點報你知，交通餐飲旅宿通通有！"} previewImage={"/images/preview_image_homepage.png"}>
            
        </Layout>
    )
}

export default ScenicspotPage