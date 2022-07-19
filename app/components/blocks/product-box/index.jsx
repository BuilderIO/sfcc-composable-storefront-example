import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ProductView from '../../../partials/product-view'
import useBasket from '../../../commerce-api/hooks/useBasket'
import {useToast} from '../../../hooks/use-toast'
import useNavigation from '../../../hooks/use-navigation'
import {useIntl} from 'react-intl'
import {
    API_ERROR_MESSAGE,
    TOAST_ACTION_VIEW_WISHLIST,
    TOAST_MESSAGE_ADDED_TO_WISHLIST
} from '../../../constants'
import useWishlist from '../../../hooks/use-wishlist'
import {Button} from '@chakra-ui/react'
import {useCommerceAPI} from '../../../commerce-api/contexts'

export function ProductBox({productRef, initialCategory}) {
    const {formatMessage} = useIntl()
    const basket = useBasket()
    const toast = useToast()
    const navigate = useNavigation()
    const [productObject, setProductObject] = useState(productRef?.data)
    const [category, setCategory] = useState(initialCategory)
    const [isLoading, setIsloading] = useState(!productObject)

    const api = useCommerceAPI()
    useEffect(() => {
        async function fetchProduct() {
            if (productObject?.id !== productRef?.options.product) {
                setIsloading(true)
                const result =
                    productRef.data ||
                    (await api.shopperProducts.getProduct({
                        parameters: {
                            id: productRef?.options.product,
                            allImages: true
                        }
                    }))
                if (result?.primaryCategoryId) {
                    const categoryRes = await api.shopperProducts.getCategory({
                        parameters: {id: result?.primaryCategoryId, levels: 1}
                    })
                    setCategory(categoryRes)
                }
                setProductObject(result)
                setIsloading(false)
            }
        }
        fetchProduct()
    }, [productRef])

    const showToast = useToast()
    const showError = () => {
        showToast({
            title: formatMessage(API_ERROR_MESSAGE),
            status: 'error'
        })
    }
    const handleAddToCart = async (variant, quantity) => {
        try {
            if (!variant?.orderable || !quantity) return
            // The basket accepts an array of `ProductItems`, so lets create a single
            // item array to add to the basket.
            const productItems = [
                {
                    productId: variant.productId,
                    quantity,
                    price: variant.price
                }
            ]

            await basket.addItemToBasket(productItems)
        } catch (error) {
            showError(error)
        }
    }

    const wishlist = useWishlist()
    // TODO: DRY this handler when intl provider is available globally
    const handleAddToWishlist = async (quantity) => {
        try {
            await wishlist.createListItem({
                id: productObject.id,
                quantity
            })
            toast({
                title: formatMessage(TOAST_MESSAGE_ADDED_TO_WISHLIST, {quantity: 1}),
                status: 'success',
                action: (
                    // it would be better if we could use <Button as={Link}>
                    // but unfortunately the Link component is not compatible
                    // with Chakra Toast, since the ToastManager is rendered via portal
                    // and the toast doesn't have access to intl provider, which is a
                    // requirement of the Link component.
                    <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                        {formatMessage(TOAST_ACTION_VIEW_WISHLIST)}
                    </Button>
                )
            })
        } catch {
            toast({
                title: formatMessage(API_ERROR_MESSAGE),
                status: 'error'
            })
        }
    }
    return (
        <div>
            <ProductView
                product={productObject}
                category={category?.parentCategoryTree || []}
                addToCart={(variant, quantity) => handleAddToCart(variant, quantity)}
                addToWishlist={(_, quantity) => handleAddToWishlist(quantity)}
                isProductLoading={isLoading}
                isCustomerProductListLoading={!wishlist.isInitialized}
            />
        </div>
    )
}

ProductBox.propTypes = {
    /** product id */
    productRef: PropTypes.object,
    productObj: PropTypes.object,
    initialCategory: PropTypes.object
}

export default ProductBox
