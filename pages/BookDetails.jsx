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

    function getPageCount() {
        let pageCount = book.pageCount
        if (pageCount > 500) pageCount += ' - Long reading'
        else if (pageCount > 200) pageCount += ' - Decent reading'
        else if (pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPublishDate(){
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear

        if(diff > 10) publishedYear += '- Vintage'
        else if (diff < 1) publishedYear += '-New'
        return publishedYear
    }

    function getPriceClass() {
        if(book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        return ''
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
                    <p>Published: {getPublishDate()}</p>
                    <p>Pages: {getPageCount()}</p>
                    <p>Categories: {categories.join(', ')}</p>
                    <span className={"book-price " + getPriceClass()}>Book Price: {listPrice.amount} {listPrice.currencyCode}</span>
                </div>
            </section>
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>
        </section>
    )
}


