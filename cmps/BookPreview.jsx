

export function BookPreview({ book }) {

    return (
        <section className="book-preview">
            <section>
                <img src={book.thumbnail} className="book-thumbnail" />
                <div className="book-title">{book.title}</div>
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