/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'www.taiwan.net.tw', 
      'www.matsu-nsa.gov.tw', 
      'www.sunmoonlake.gov.tw', 
      'www.travel.taipei', 
      'cloud.culture.tw', 
      'newtaipei.travel',
      'www.trimt-nsa.gov.tw',
      'tourism.chcg.gov.tw',
      'travel.nantou.gov.tw',
      'tour.yunlin.gov.tw',
      'penghutravel.com',
      'swcoast-nsa.travel',
      'taiwan.taiwanstay.net.tw',
      'www.eastcoast-nsa.gov.tw',
      'www.erv-nsa.gov.tw',
      'www.penghu-nsa.gov.tw',
      'khh.travel',
      '1.bp.blogspot.com',
      '210.69.151.212',
      'www.ali-nsa.net',
      'www.siraya-nsa.gov.tw',
      'www.northguan-nsa.gov.tw',
      'www.focusline.com.tw',
      'www.taipeisprings.org.tw',
      'www.facebook.com'
    ],
  },
}
