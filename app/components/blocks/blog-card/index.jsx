import React from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, Link, Image, Text, HStack, Tag, useColorModeValue} from '@chakra-ui/react'

const BlogTags = (props) => {
    return (
        <HStack spacing={2}>
            {props.tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                )
            })}
        </HStack>
    )
}

BlogTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
}

const BlogAuthor = (props) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src={props.author.image || 'https://via.placeholder.com/50x50'}
                alt={`Avatar of ${props.author.name}`}
            />
            <Text fontWeight="medium">{props.author.name}</Text>
            <Text>{props.author.name}</Text>
            <Text>{props.date.toLocaleDateString('en-US')}</Text>
        </HStack>
    )
}

BlogAuthor.propTypes = {
    author: PropTypes.any,
    date: PropTypes.date
}

export function BlogCard(props) {
    return (
        <Box
            marginTop={{base: '1', sm: '5'}}
            display="flex"
            flexDirection={{base: 'column', sm: 'row'}}
            justifyContent="space-between"
        >
            <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
                <Box
                    width={{base: '100%', sm: '85%'}}
                    zIndex="2"
                    marginLeft={{base: '0', sm: '5%'}}
                    marginTop="5%"
                >
                    <Image
                        borderRadius="lg"
                        src={props.image || 'https://via.placeholder.com/300x200'}
                        alt={`image for blog article ${props.title}`}
                        objectFit="contain"
                    />
                </Box>
            </Box>
            <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{base: '3', sm: '0'}}
            >
                <BlogTags tags={props.keywords} />
                <Heading marginTop="1">
                    <Link textDecoration="none" _hover={{textDecoration: 'none'}}>
                        {props.title}
                    </Link>
                </Heading>
                <Text
                    as="div"
                    marginTop="2"
                    color={useColorModeValue('gray.700', 'gray.200')}
                    dangerouslySetInnerHTML={{__html: props.excerpt}}
                    fontSize="lg"
                ></Text>
                <BlogAuthor author={props.author} date={props.date} />
            </Box>
        </Box>
    )
}

BlogCard.propTypes = {
    title: PropTypes.string,
    excerpt: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.any,
    keywords: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.any
}

export default BlogCard
