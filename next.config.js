/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['www.taiwan.net.tw', 'www.matsu-nsa.gov.tw', 'www.sunmoonlake.gov.tw'],
  },
}
