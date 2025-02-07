import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))
    }

    if (!book) return 'Loading...'

    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book

    return (
        <section className="book-details">
            <section>
                <div className='book-title'>Book Title: {title}</div>
                <div className='book-subtitle'>Book subtitle: {subtitle}</div>
                <div className="book-thumbnail-container">
                    <img src={thumbnail} />
                </div>
            </section>

            <section>
                <div className='book-more-info'>
                    <div className='book-authors'>Authors: <span>{authors.join(',')}</span></div>
                    <p>Description: {description}</p>
                    <p>Language: {language}</p>
                    <p>Categories: {categories.join(', ')}</p>
                    <h3>Book Price: {listPrice.amount} {listPrice.currencyCode}</h3>
                </div>
            </section>
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>
        </section>
    )
}


