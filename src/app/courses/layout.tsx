import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/app/globals.css'
import Layout from '@/components/Layout/App/Index'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Skilltree student portal',
    // description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl">
        <body className={inter.className}>

        <Layout>
            {children}
        </Layout>

        </body>
        </html>
    )
}
