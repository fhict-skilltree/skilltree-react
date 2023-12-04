import { redirect } from 'next/navigation'

export default async function Dashboard({}) {
    // Check user
    // authenticated => get latest course for user and redirect to that user

    const courseUuid = '954507e2-3bdb-43e0-bd60-1985c2961673'

    if (true) {
        redirect(`/courses/${courseUuid}`)
    }

    redirect('/organisation-login')
}
