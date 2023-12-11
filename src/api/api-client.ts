import axios, { AxiosResponse } from 'axios'
import {auth} from '@/app/api/auth/[...nextauth]/route'

export const getBearerToken = async () => {
    const session = await auth()

    return `Bearer ${session?.accessToken}`
}

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    // headers: {
    //     'Authorization': await getBearerToken(),
    // },
})
api.defaults.headers.common['Content-Type'] = 'application/json'

export { api }