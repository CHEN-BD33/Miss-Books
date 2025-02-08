import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({ book, onGoBack,onEdit}) {

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
                    <p>Language: {language}</p>
                    <p>Published: {getPublishDate()}</p>
                    <p>Pages: {getPageCount()}</p>
                    <p>Categories: {categories.join(', ')}</p>
                    <span className={"book-price " + getPriceClass()}>Book Price: {listPrice.amount} {listPrice.currencyCode}</span>
                    {listPrice.isOnSale && <div className="book-on-sale">On-sale!</div>}
                </div>
            </section>

            <section>
                <span className='book-description'>Description: </span>
                <LongTxt txt={description} />
            </section>

            <button onClick={onGoBack}>Back</button>
            <button className="go-edit-btn" onClick={onEdit}>Edit</button>
        </section>
    )
}


