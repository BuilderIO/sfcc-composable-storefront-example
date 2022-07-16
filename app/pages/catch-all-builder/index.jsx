import React from 'react'
import {BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import PageNotFound from '../page-not-found';

export const CatchAllPage = ({ page }) => {
    const isPreviewing = useIsPreviewing();
    if (!isPreviewing && !page) {
        return <PageNotFound />
    }
    return <BuilderComponent model="page" content={page} options={{includeRefs: true}}/>
}


CatchAllPage.getProps = async ({res, params, location, api}) => {
    const page = await builder.get('page', {
        url: location.pathname,
        options: {
        includeRefs: true,
    }}).toPromise();

    if (!page && res) {
        res.status(404)
    }

    return { page }
}
export default CatchAllPage
