import React from 'react'
import {BuilderComponent, builder, useIsPreviewing, BuilderContent} from '@builder.io/react'
import PageNotFound from '../page-not-found'
import Seo from '../../components/seo'
import {Box, Container} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import builderConfig from '../../utils/builder'
import BlogCard from '../../components/blocks/blog-card'
export const BlogPage = ({article}) => {
    const isPreviewing = useIsPreviewing()

    if (!isPreviewing && !article) {
        return <PageNotFound />
    }

    return (
        <Box css={{minHeight: '100vh'}}>
            <BuilderContent
                content={article}
                options={{includeRefs: true}}
                model={builderConfig.blogArticleModel}
            >
                {(content, loading, full) => {
                    const {title, excerpt, keywords, noIndex, author, image} = content || {}
                    return (
                        content && (
                            <Container maxW={'7xl'} p="12">
                                <Seo
                                    title={title}
                                    description={excerpt}
                                    noIndex={noIndex}
                                    keywords={keywords?.join(', ')}
                                />
                                <BlogCard
                                    date={new Date(full.lastUpdated || Date.now())}
                                    image={image}
                                    keywords={keywords || []}
                                    excerpt={excerpt || 'lorem Ipsum'}
                                    author={author?.value?.data || {}}
                                    title={title || 'Untitled'}
                                />
                                <BuilderComponent
                                    model={builderConfig.blogArticleModel}
                                    content={article}
                                    options={{includeRefs: true}}
                                />
                            </Container>
                        )
                    )
                }}
            </BuilderContent>
        </Box>
    )
}

// eslint-disable-next-line
BlogPage.getProps = async ({res, api, location}) => {
    const slug = location.pathname.split('/')[2]
    const article = await builder
        .get(builderConfig.blogArticleModel, {
            options: {
                includeRefs: true
            },
            query: {
                data: {
                    slug
                }
            }
        })
        .toPromise()

    if (!article && res) {
        res.status(404)
    }

    return {article}
}

BlogPage.propTypes = {
    article: PropTypes.any
}

export default BlogPage
