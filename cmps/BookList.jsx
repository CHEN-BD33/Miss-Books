import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList ({ books, onRemoveBook }) {
    
    return (
        <section>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section className='book-actions'>
                            <button><Link to={`/book/${book.id}`}>Details</Link></button>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}