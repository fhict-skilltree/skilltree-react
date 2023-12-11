import {auth} from '@/app/api/auth/[...nextauth]/route'

export default async function Dashboard({}) {
    const session = await auth()

    return (
        <div className={"container mx-auto my-6"}>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
