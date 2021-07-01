module.exports = {
  images: {
      domains: ['media.giphy.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-rss')
    }
    return config
  }
}