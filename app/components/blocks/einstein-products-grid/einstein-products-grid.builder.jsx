import React from 'react'
import {Builder} from '@builder.io/react'
import loadable from '@loadable/component'
import {Skeleton} from '@chakra-ui/react'

const fallback = <Skeleton height="75vh" width="100%" />
const EinsteinProductsGrid = loadable(() => import('./index'), {fallback})

Builder.registerComponent(EinsteinProductsGrid, {
    name: 'EinsteinProductsGrid',
    image:
        'https://cdn.builder.io/api/v1/image/assets%2Fd1ed12c3338144da8dd6b63b35d14c30%2F671167ab7faa41d59624c88acf109360',
    defaults: {
        bindings: {
            'component.options.product': 'state.product'
        }
    },
    inputs: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'recommender',
            type: 'SFCommerceRecommender',
            required: true
        }
    ]
})
