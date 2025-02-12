import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

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
                console.log('removed!')
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }


    if (!books) return 'Loading..'

    return (
        <section className="book-index">
    
                < React.Fragment >
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} />
                </React.Fragment>
         
        </section>
    )
}
