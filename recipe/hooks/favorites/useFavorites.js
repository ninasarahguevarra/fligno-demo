import backendapi from 'utils/auth'

const useAddToFavorites = async (payload) => {
    return await backendapi('POST', `/favorites/add`, payload)
}

const useRemoveFromFavorites = async (payload) => {
    return await backendapi('POST', `/favorites/delete`, payload)
}

const useFavoritesList = async (payload) => {
    const response = await backendapi('GET', `/favorites/list`, payload)
    return response.data
}

export {
    useAddToFavorites,
    useRemoveFromFavorites,
    useFavoritesList
}
