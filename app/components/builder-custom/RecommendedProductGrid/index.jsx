import React from 'react'
import PropTypes from 'prop-types'
import RecommendedProducts from '../../recommended-products'

export function RecommendedProductGrid({recommender, title}) {
    console.log('props aqui ', recommender, title)
    return (
        <div>
            <RecommendedProducts
                title={title}
                recommender={recommender}
                mx={{base: -4, sm: -6, lg: 0}}
            />
        </div>
    )
}

RecommendedProductGrid.propTypes = {
    /** recommender id */
    recommender: PropTypes.string,

    title: PropTypes.string
}

export default RecommendedProductGrid
