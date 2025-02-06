

export function BookPreview({ book }) {
    
    return (
        <section className="book-preview">
            <h4>{book.title}</h4>
            <h4>Price: {book.listPrice.amount}</h4>
        </section>
    )
}