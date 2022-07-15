import React from 'react'

import {Stack} from '@chakra-ui/react'
import ProductScroller from '../../product-scroller'

function ProductGrid() {
    return (
        <div>
            <Stack pt={8} spacing={16}>
                <ProductScroller products={[]} isLoading={false} />
            </Stack>
        </div>
    )
}

export default ProductGrid
