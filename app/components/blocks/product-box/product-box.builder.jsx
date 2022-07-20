import React from 'react'
import {Builder} from '@builder.io/react'
import loadable from '@loadable/component'
import {Skeleton} from '@chakra-ui/react'
const fallback = <Skeleton height="75vh" width="100%" />

const ProductBox = loadable(() => import('./index'), {fallback})

Builder.registerComponent(ProductBox, {
    name: 'ProductBox',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/box.svg',
    inputs: [
        {
            name: 'productRef',
            friendlyName: 'Product',
            type: 'SFCommerceProduct',
            required: true
        }
    ]
})
