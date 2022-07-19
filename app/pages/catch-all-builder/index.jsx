import React from 'react'
import {BuilderComponent, builder, useIsPreviewing} from '@builder.io/react'
import PageNotFound from '../page-not-found'
import Seo from '../../components/seo'
import {Box} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import builderConfig from '../../utils/builder'

export const CatchAllPage = ({page}) => {
    const isPreviewing = useIsPreviewing()

    if (!isPreviewing && !page) {
        return <PageNotFound />
    }
    let header = <React.Fragment></React.Fragment>
    if (page) {
        const {title, description, keywords} = page.data
        header = <Seo title={title} description={description} keywords={keywords?.join(', ')} />
    }

    return (
        <Box css={{minHeight: '100vh'}}>
            {header}
            <BuilderComponent
                model={builderConfig.pageModel}
                content={page}
                options={{includeRefs: true}}
            />
        </Box>
    )
}

// eslint-disable-next-line
CatchAllPage.getProps = async ({res, api, location}) => {
    const page = await builder
        .get(builderConfig.pageModel, {
            url: location.pathname,
            options: {
                includeRefs: true
            }
        })
        .toPromise()

    if (!page && res) {
        res.status(404)
    }

    return {page}
}

CatchAllPage.propTypes = {
    page: PropTypes.any
}

export default CatchAllPage
