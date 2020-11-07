'use strict'

require('module-alias/register')
require('source-map-support').install()
require('ts-node').register(require('./tsconfig.json'))

const {onCreatePage, createPages} = require('./src/gatsby-pages')

exports.createPages = createPages
exports.onCreatePage = onCreatePage
