import {redirect} from 'next/navigation'
import {auth} from '@/app/api/auth/[...nextauth]/route'
import {CourseRepository} from "@/api/repositories/course-repository";

export default async function Dashboard({}) {
    const courses = await CourseRepository.getUserEnrolledCourses()
    const latestEnrolledCourseUuid = courses[0].uuid

    redirect(`/app/courses/${latestEnrolledCourseUuid}`)

    return (
        <div>
            Cannot redirect user to latest course because the user has not been added to a course.
        </div>
    )

    redirect('/api/auth/signin')
}
