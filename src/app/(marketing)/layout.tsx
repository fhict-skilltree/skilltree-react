import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/app/globals.css'
import MarketingLayout from '@/components/Layouts/Marketing/Index'

const inter = Inter({subsets: ['latin']})
import classNames from "classnames"

export const metadata: Metadata = {
    title: 'Skilltree student portal',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl">
        <body className={classNames(inter.className, "flex flex-col min-h-screen")}>
        <MarketingLayout>
            {children}
        </MarketingLayout>
        </body>
        </html>
    )
}
