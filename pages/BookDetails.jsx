import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({onSetSelectedBookId, selectedBookId}) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))
    }

    if (!book) return 'Loading...'
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Book Price: {book.listPrice.amount}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>
        </section>
    )
}

