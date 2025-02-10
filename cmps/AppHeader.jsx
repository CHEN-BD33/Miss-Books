
export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header">
                <h1>Books Shop App</h1>
                <nav className="nav-bar">
                    <a onClick={() => onSetPage('home')} href="#">Home</a>
                    <a onClick={() => onSetPage('book')} href="#">Books</a>
                    <a onClick={() => onSetPage('about')} href="#">About</a>
                </nav>
        </header>
    )
}