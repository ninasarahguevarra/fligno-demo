import api from 'utils/api'

const useRecipeList = async (payload) => {
    return await api('GET', `/api/recipes/v2`, payload)
}
const useRecipeDetails = async (payload) => {
    return await api('GET', `/api/recipes/v2/${payload.id}`, payload)
}

export {
    useRecipeList,
    useRecipeDetails
}
