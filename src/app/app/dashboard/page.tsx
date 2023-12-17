import {redirect} from 'next/navigation'
import {getUserEnrolledCourses} from "@/api/repositories/course-repository";

export default async function Dashboard({}) {
    const courses = await getUserEnrolledCourses()
    const latestEnrolledCourseUuid = courses[0].uuid

    redirect(`/app/courses/${latestEnrolledCourseUuid}`)

    return (
        <div>
            Cannot redirect user to latest course because the user has not been added to a course.
        </div>
    )
}
