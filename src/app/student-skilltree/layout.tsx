import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/App/Index'

export default function StudentLayout({ children }: AppProps) {
    return (
        <Layout>
            {children}
        </Layout>
    )
}