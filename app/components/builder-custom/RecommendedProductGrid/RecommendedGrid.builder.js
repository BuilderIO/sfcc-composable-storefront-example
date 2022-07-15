import {Builder} from '@builder.io/react'
import {RecommendedProductGrid} from './index'

export const RecommendedProductGridConfig = {
    name: 'Recommended Product Grid',
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
}
Builder.registerComponent(RecommendedProductGrid, RecommendedProductGridConfig)
