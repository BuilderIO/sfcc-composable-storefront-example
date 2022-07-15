/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {start, registerServiceWorker} from 'pwa-kit-react-sdk/ssr/browser/main'
import {builder} from '@builder.io/react'

builder.init('d1ed12c3338144da8dd6b63b35d14c30')

const main = () => {
    // The path to your service worker should match what is set up in ssr.js
    return Promise.all([start(), registerServiceWorker('/worker.js')])
}

main()
