import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

export function BookEdit() {
    
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Failed to load book:', err)
                showErrorMsg('Cannot load book')
            })
    }

    function onHandleChange({ target }) {
        let { value, name: field } = target

        if (field === 'price') {
            setBook((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, amount: +value } }))
        } else {
            setBook((prevBook) => ({ ...prevBook, [field]: value }))
        }
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                showSuccessMsg('Book saved')
                navigate('/book')

            })
            .catch(err => {
                console.log('Problem saving book:', err)
                showErrorMsg('Problem with saving book')
            })
    }

    function getPageCount() {
        let pageCount = book.pageCount
        if (pageCount > 500) pageCount += ' - Long reading'
        else if (pageCount > 200) pageCount += ' - Decent reading'
        else if (pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear

        if (diff > 10) publishedYear += '- Vintage'
        else if (diff < 1) publishedYear += '-New'
        return publishedYear
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
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

            <form onSubmit={onSaveBook}>
                <section>
                    <div className='book-title'>Book Title:</div>
                    <input name="title" value={title} onChange={onHandleChange} type="text" id="title" />
                    <div className='book-subtitle'>Book subtitle: {subtitle}</div>
                    <div className="book-thumbnail-container">
                        <img src={thumbnail} />
                    </div>
                </section>

                <section>
                    <div className='book-more-info'>
                        <div className='book-authors'>Authors: <span>{authors.join(',')}</span></div>
                        <div className='book-language'>Language: <span>{language}</span></div>
                        <div className='book-published'>Published: <span>{getPublishDate()}</span></div>
                        <div className='book-pages'>Pages: <span>{getPageCount()}</span></div>
                        <div className='book-categories'>Categories: <span>{categories.join(', ')}</span></div>
                        <span className={"book-price " + getPriceClass()}>Book Price:</span>
                        <input name="price" value={listPrice.amount} onChange={onHandleChange} type="number" id="price" />
                    </div>
                </section>
            </form>

            <div className='book-edit-actions-container'>
                <button className='save-edit-btn' onClick={onSaveBook}>Save ✔</button>
                <button className='cancel-edit-btn'> <Link to="/book">Cancel ✖</Link></button>
            </div>


            <section>
                <span className='book-description'>Description: </span>
                <LongTxt txt={description} />
            </section>

        </section>
    )
}


