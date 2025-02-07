

export function BookPreview({ book }) {

    return (
        <section className="book-preview">
            <section>
                <div className="book-title">{book.title}</div>
                <img src={book.thumbnail} className="book-thumbnail" />
            </section>

            <section>
                <div className="book-details">
                    <div className="book-author"> Author:<span> {book.authors}</span></div>
                    <div className="book-price"> Price: <span>{book.listPrice.amount}</span> <span> {book.listPrice.currencyCode}</span></div>
                </div>
            </section>
        </section>
    )
}