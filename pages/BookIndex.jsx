import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg('Book Removed')
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg('Problems removing book')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    

    if (!books) return 'Loading..'

    return (
        <section className="book-index">
            <div className="add-book">
               <button><Link to="/book/add">Add New Book</Link></button>
            </div>

                <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}
