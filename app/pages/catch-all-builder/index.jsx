import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {BuilderComponent, builder, Builder} from '@builder.io/react'

export const CatchAllPage = () => {
    const [pageJson, setPage] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true)
            const content = await builder.get('page', {url: history.location.pathname}).toPromise()
            setPage(content)
            setLoading(false)
        }
        if (!isEditingOrPreviewing) {
            fetchPage()
        }
    }, [history.location.pathname, isEditingOrPreviewing])

    if (loading) {
        return <h1>Loading...</h1>
    }
    return <BuilderComponent model="page" content={pageJson} />
}

export default CatchAllPage
