import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"

import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }

    function onUpdateBook(bookToSave) {
        bookService.save(bookToSave)
            .then((savedBook) => {
                setSelectedBook(bookToSave)
                setIsEdit(false)
                setBooks(prevBooks => prevBooks.map((b) => b.id === savedBook.id ? savedBook : b))
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

    function onSelectedBook(bookId) {
        const book = books.find(book => book.id === bookId)
        setSelectedBook(book)
    }


    if (!books) return 'Loading..'

    return (
        <section className="book-index">
            <h1>Book Index!</h1>

            {!selectedBook && (
                < React.Fragment >
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} onSelectedBook={onSelectedBook} />
                </React.Fragment>
            )}


            {selectedBook && (
                <section>
                    {!isEdit && (
                        <BookDetails book={selectedBook} onGoBack={() => setSelectedBook(null)} onEdit={() => setIsEdit(true)} />
                    )}

                    {isEdit && (
                        <BookEdit book={selectedBook} onUpdate={onUpdateBook} onCancelEdit={() => setIsEdit(false)} />
                    )}
                </section >
            )}
        </section>
    )
}
