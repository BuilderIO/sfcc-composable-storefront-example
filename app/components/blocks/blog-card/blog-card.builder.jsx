import React, {useEffect, useState} from 'react'
import {Text, Skeleton} from '@chakra-ui/react'
import {Builder} from '@builder.io/react'
import builderConfig from '../../../utils/builder'
import loadable from '@loadable/component'
import {Link} from 'react-router-dom'

const fallback = <Skeleton height="75vh" width="100%" />
const BlogCard = loadable(() => import('./index'), {fallback})

Builder.registerComponent(
    (props) => {
        const [article, setArticle] = useState(props.article?.value)
        useEffect(() => {
            async function fetchBlog() {
                setArticle(
                    await fetch(
                        `https://cdn.builder.io/api/v2/content/${props.article.model}/${props.article.id}?apiKey=${builderConfig.apiKey}&includeRefs=true`
                    ).then((res) => res.json())
                )
            }
            if (props.article?.id) {
                fetchBlog()
            }
        }, [props.article])

        if (article) {
            return (
                <Link to={`/blog/${article.data.slug}`}>
                    <BlogCard
                        isColumn={props.isColumn}
                        date={new Date(article.lastUpdated || Date.now())}
                        keywords={article.data.keywords || []}
                        title={article.data.title}
                        excerpt={article.data.excerpt}
                        image={article.data.image}
                        author={article.data.author.value?.data || {}}
                    />
                </Link>
            )
        }
        return <Text> Pick an article </Text>
    },
    {
        name: 'BlogCard',
        image:
            'https://cdn.builder.io/api/v1/image/assets%2Fd1ed12c3338144da8dd6b63b35d14c30%2Fbcac0e5a87ac4ad29b37d5159a63dbca',
        inputs: [
            {
                name: 'article',
                type: 'reference',
                model: 'blog-article'
            },
            {
                name: 'isColumn',
                friendlyName: 'Stack vertically',
                type: 'boolean'
            }
        ]
    }
)
