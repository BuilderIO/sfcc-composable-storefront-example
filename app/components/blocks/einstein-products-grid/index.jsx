import React from 'react'
import PropTypes from 'prop-types'
import RecommendedProducts from '../../recommended-products'

export function EinsteinProductsGrid({recommender, title, product}) {
    return (
        <div>
            <RecommendedProducts
                title={title}
                products={product && [product.id]}
                recommender={recommender}
                mx={{base: -4, sm: -6, lg: 0}}
            />
        </div>
    )
}

EinsteinProductsGrid.propTypes = {
    /** recommender id */
    recommender: PropTypes.string,
    product: PropTypes.object,
    title: PropTypes.string
}

export default EinsteinProductsGrid
