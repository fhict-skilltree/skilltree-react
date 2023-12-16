import { api, getBearerToken, getAuthenticatedUserUuid } from '@/api/api-client'

export class CourseRepository {

    static async getUserEnrolledCourses() {
        const userUuid = await getAuthenticatedUserUuid()

        const config = {
            headers: {
                Authorization: await getBearerToken()
            },
            params: {
                sort: '-created_at',
            },
        }

        const response = await api.get(`users/${userUuid}/enrolled_courses`, config)

        return response?.data?.data
    }

    static async findByUuid({ courseUuid }) {
        const config = {
            headers: {
                Authorization: await getBearerToken()
            },
        }

        const response = await api.get(`courses/${courseUuid}`, config)

        return response?.data?.data
    }

}