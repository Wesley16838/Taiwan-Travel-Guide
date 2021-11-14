import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import TourismsProvider from '../context/tourismProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TourismsProvider>
      <Component {...pageProps} />
    </TourismsProvider>
  )
}
export default MyApp
