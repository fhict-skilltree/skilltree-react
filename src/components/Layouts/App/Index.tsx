import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, user }) {
    return (
        <>
            <Navbar user={user} />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}