import { BookPreview } from "./BookPreview.jsx";

export function BookList ({ books, onRemoveBook, onSelectedBook }) {
    
    return (
        <section>
            <h2> Book List:</h2>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                            <button onClick={() => onSelectedBook(book.id)}>Details</button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}