/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
'use strict'

const path = require('path')
const {getRuntime} = require('pwa-kit-runtime/ssr/server/express')
const {isRemote} = require('pwa-kit-runtime/utils/ssr-server')
const {getConfig} = require('pwa-kit-runtime/utils/ssr-config')
const helmet = require('helmet')
const cheerio = require('cheerio')

const options = {
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // This is the value of the 'mobify' object from package.json
    mobify: getConfig(),

    // The port that the local dev server listens on
    port: 3000,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development.
    protocol: 'http'
}

const runtime = getRuntime()

const {handler} = runtime.createHandler(options, (app) => {
    // Set HTTP security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'img-src': [
                        "'self'",
                        '*.commercecloud.salesforce.com',
                        'data:',
                        'https://*.builder.io',
                        'https://builder.io'
                    ],
                    'script-src': [
                        "'self'",
                        "'unsafe-eval'",
                        'storage.googleapis.com',
                        'https://*.builder.io',
                        "'unsafe-inline'"
                    ],

                    // Do not upgrade insecure requests for local development
                    // Do not upgrade insecure requests for local development
                    'upgrade-insecure-requests': isRemote() ? [] : null,
                    'frame-ancestors':
                        'https://*.builder.io https://builder.io http://localhost:1234',
                    'connect-src': '*'
                    // 'Access-Control-Allow-Origin': '*',
                    // // https://developer.chrome.com/blog/private-network-access-preflight/#new-in-pna
                    // 'Access-Control-Allow-Private-Network': 'true',
                }
            },
            hsts: isRemote()
        })
    )

    // Handle the redirect from SLAS as to avoid error
    app.get('/callback?*', (req, res) => {
        res.send()
    })
    app.get('/robots.txt', runtime.serveStaticFile('static/robots.txt'))
    app.get('/favicon.ico', runtime.serveStaticFile('static/ico/favicon.ico'))

    app.get('/worker.js(.map)?', runtime.serveServiceWorker)
    app.get('*', (req, res, next) => {
        const interceptedResponse = interceptMethodCalls(res, 'send', ([result]) => {
            const styles = extractABTestingStyles(result)
            if (!styles) {
                return [result]
            }
            return [result.replace('<body>', `<body><style>${styles}</style>`)]
        })
        return runtime.render(req, interceptedResponse, next)
    })
})

/**
 * See this issue for more details https://github.com/emotion-js/emotion/issues/2040
 * Chakra using emotion which render styles inside template tags causing it not to apply when rendering
 * A/B test variations on the server, this fixes this issue by extracting those styles and appending them to body
 */
function extractABTestingStyles(body) {
    let globalStyles = ''

    if (body.includes('<template')) {
        const $ = cheerio.load(body)
        const templates = $('template')
        templates.toArray().forEach((element) => {
            const str = $(element).html()
            const styles = cheerio.load(String(str))('style')
            globalStyles += styles
                .toArray()
                .map((el) => $(el).html())
                .join(' ')
        })
    }
    return globalStyles
}

function interceptMethodCalls(obj, methodName, fn) {
    return new Proxy(obj, {
        get(target, prop) {
            // (A)
            if (prop === methodName) {
                return new Proxy(target[prop], {
                    apply: (target, thisArg, argumentsList) => {
                        // (B)
                        const result = fn(argumentsList)
                        return Reflect.apply(target, thisArg, result)
                    }
                })
            } else {
                return Reflect.get(target, prop)
            }
        }
    })
}

// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
exports.get = handler
