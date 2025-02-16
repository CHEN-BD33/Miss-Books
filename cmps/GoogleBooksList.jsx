
export function GoogleBooksList({ booksList, onSaveBook }) {
    return (
        <ul className='google-search-list'>
            {booksList.map(book =>
                <li key={book.id}>
                    <span>{book.title}</span>
                    <button onClick={() => onSaveBook(book)}>+</button>
                </li>)}
        </ul>
    )
}