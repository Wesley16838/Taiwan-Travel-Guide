import Head from 'next/head'
import { LayoutProps } from '../../types/components'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
// add nav and footer
export default function Layout({ children, pageTitle, description, previewImage, siteName }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />

        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
+       <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>
      </Head>
      <Navbar/>
        {children}
      <Footer/>
    </>
  )
}