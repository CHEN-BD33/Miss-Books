
export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Books Shop App</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')} href="#">Home</a>
                    <a onClick={() => onSetPage('book')} href="#">Books</a>
                    <a onClick={() => onSetPage('about')} href="#">About</a>
                </nav>
            </section>
        </header>
    )
}