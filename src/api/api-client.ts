import axios, { AxiosResponse } from 'axios'
import {auth} from '@/app/api/auth/[...nextauth]/route'

export const getBearerToken = async () => {
    const session = await auth()

    return `Bearer ${session?.accessToken}`
}

export const getAuthenticatedUserUuid = async () => {
    // const session = await auth()

    // TODO:
    return 'ce120cca-166b-4d68-a255-4587c025de6a'
}

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    // headers: {
    //     'Authorization': await getBearerToken(),
    // },
})
api.defaults.headers.common['Content-Type'] = 'application/json'

export { api }