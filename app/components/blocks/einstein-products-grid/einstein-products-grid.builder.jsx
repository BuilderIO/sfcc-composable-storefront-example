import React from 'react'
import {Builder} from '@builder.io/react'
import loadable from '@loadable/component'
import {Skeleton} from '@chakra-ui/react'

const fallback = <Skeleton height="75vh" width="100%" />
const EinsteinProducstGrid = loadable(() => import('./index'), {fallback})

Builder.registerComponent(EinsteinProducstGrid,  {
    name: 'EinsteinProductGrid',
    image:
        'https://cdn.builder.io/api/v1/image/assets%2F1fa6810c36c54e87bfe1a6cc0f0be906%2F187c548d37a24f68adc65382ac7c553c',
    inputs: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'recommender',
            type: 'text',
            enum: ['viewed-recently-einstein', 'pdp-similar-items', 'products-in-all-categories'],
            required: true
        }
    ]
})
