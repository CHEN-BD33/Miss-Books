import { BookPreview } from "./BookPreview.jsx";

export function BookList ({ books, onRemoveBook, onSelectedBook }) {
    
    return (
        <section>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section className='book-actions'>
                            <button onClick={() => onSelectedBook(book.id)}>Details</button>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}