import React, {useState, useEffect} from 'react'

import {Stack, AspectRatio, SimpleGrid, Skeleton, Button} from '@chakra-ui/react'
import {useCommerceAPI} from '../../../commerce-api/contexts'
import ProductTile from '../../product-tile'
import useWishlist from '../../../hooks/use-wishlist'
import {useToast} from '../../../hooks/use-toast'
import {useIntl} from 'react-intl'
import {
    API_ERROR_MESSAGE,
    TOAST_ACTION_VIEW_WISHLIST,
    TOAST_MESSAGE_ADDED_TO_WISHLIST,
    TOAST_MESSAGE_REMOVED_FROM_WISHLIST
} from '../../../constants'
import useNavigation from '../../../hooks/use-navigation'
import PropTypes from 'prop-types'

function ProductsGrid({productIds}) {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const api = useCommerceAPI()
    const navigate = useNavigation()
    const {formatMessage} = useIntl()
    useEffect(() => {
        async function fetchList() {
            setIsLoading(true)
            if (productIds?.length > 0) {
                const results = await api.shopperProducts.getProducts({
                    parameters: {ids: productIds.join(','), allImages: true}
                })
                setProducts(results.data)
            }
            setIsLoading(false)
        }
        fetchList()
    }, [productIds])
    const wishlist = useWishlist()
    const toast = useToast()
    // keep track of the items has been add/remove to/from wishlist
    const [wishlistLoading, setWishlistLoading] = useState([])
    // TODO: DRY this handler when intl provider is available globally
    const addItemToWishlist = async (product) => {
        try {
            setWishlistLoading([...wishlistLoading, product.productId])
            await wishlist.createListItem({
                id: product.productId,
                quantity: 1
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
        } finally {
            setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
        }
    }

    // TODO: DRY this handler when intl provider is available globally
    const removeItemFromWishlist = async (product) => {
        try {
            setWishlistLoading([...wishlistLoading, product.productId])
            await wishlist.removeListItemByProductId(product.productId)
            toast({
                title: formatMessage(TOAST_MESSAGE_REMOVED_FROM_WISHLIST),
                status: 'success'
            })
        } catch {
            toast({
                title: formatMessage(API_ERROR_MESSAGE),
                status: 'error'
            })
        } finally {
            setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
        }
    }

    return (
        <SimpleGrid columns={[2, 2, 3, 3]} spacingX={4} spacingY={{base: 12, lg: 16}}>
            {isLoading
                ? new Array(productIds?.length || 1).fill(0).map((_, index) => (
                      <Stack key={index} data-testid="product-scroller-item-skeleton">
                          <AspectRatio ratio={1}>
                              <Skeleton />
                          </AspectRatio>
                          <Stack spacing={2}>
                              <Skeleton width="150px" height={5} />
                              <Skeleton width="75px" height={5} />
                          </Stack>
                      </Stack>
                  ))
                : products?.map((product) => {
                      const productId = product.id
                      const isInWishlist = !!wishlist.findItemByProductId(productId)

                      return (
                          <ProductTile
                              data-testid={`sf-product-tile-${product.id}`}
                              key={product.id}
                              product={product}
                              enableFavourite={true}
                              isFavourite={isInWishlist}
                              onFavouriteToggle={(isFavourite) => {
                                  const action = isFavourite
                                      ? addItemToWishlist
                                      : removeItemFromWishlist
                                  return action(product)
                              }}
                              dynamicImageProps={{
                                  widths: ['70vw', '70vw', '40vw', '30vw']
                              }}
                          />
                      )
                  })}
        </SimpleGrid>
    )
}

ProductsGrid.propTypes = {
    productIds: PropTypes.any
}

export default ProductsGrid
