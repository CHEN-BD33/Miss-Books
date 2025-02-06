import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    // const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => {
                console.log('Books received:', books)
                setBooks(books)
            })
    }

    // function onSetFilterBy(filterBy) {
    //     setFilterBy({ ...filterBy })
    // }

    if (!books) return 'Loading..'

    return (
        <section className="book-index">
            <h1>Book Index!</h1>
            <BookList books={books} />
        </section>
    )
}

