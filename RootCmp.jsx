import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const { useState } = React

export function App() {

    const [page, setPage] = useState('book')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} />

            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}