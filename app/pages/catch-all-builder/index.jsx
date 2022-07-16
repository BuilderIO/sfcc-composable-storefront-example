import React, { useState } from 'react'
import {BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import PageNotFound from '../page-not-found';
import Seo from '../../components/seo';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

export const CatchAllPage = ({ page }) => {
    const isPreviewing = useIsPreviewing();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isPreviewing && !page) {
        return <PageNotFound />
    }
    let header = <React.Fragment></React.Fragment>
    let delay = false;
    if (page) {
        const { title, description, keywords } = page.data;
        header = <Seo title={title} description={description} keywords={keywords?.join(', ')} ></Seo>
        // delay rendering to client side when there's an a/b test, styling of ab tests is not playing well with chakra
        delay = Object.keys(page.variations || {}).length > 0;
    }

   return <Box css={{ minHeight: '100vh'}}>
          {header}
          { (delay ? mounted : true ) && <BuilderComponent model="page" content={page} options={{includeRefs: true}}/>}
        </Box>
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
