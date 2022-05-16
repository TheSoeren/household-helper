const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'de-CH'],
    reloadOnPrerender: process.env.NODE_ENV === 'development', // This enables hot-reload on translation changes
    localePath: path.resolve('./public/locales'), // for vercel to find the translations
    defaultNS: 'common',
  },
}
