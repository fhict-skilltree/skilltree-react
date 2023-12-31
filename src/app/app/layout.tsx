import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/app/globals.css'
import Layout from '@/components/Layouts/App/Index'
import {auth} from '@/app/api/auth/[...nextauth]/route'
import classNames from "classnames";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'TalentPulse',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <html lang="nl">
        <body className={classNames(inter.className, 'bg-slate-100')}>

        <Layout user={session.user}>
            {children}
        </Layout>

        </body>
        </html>
    )
}
