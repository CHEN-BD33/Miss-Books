const { NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header">
            <h1>Books Shop App</h1>
            <nav className="nav-bar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}