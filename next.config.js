// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['ddragon.leagueoflegends.com', 'opgg-static.akamaized.net', 'raw.communitydragon.org'],
  },
  trailingSlash: true
}

module.exports = nextConfig