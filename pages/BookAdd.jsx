import { AddGoogleBook } from '../cmps/AddGoogleBook.jsx'

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function BookAdd() {
    const [bookToAdd, setBookToAdd] = useState(bookService.getEmptyBook())

    const navigate = useNavigate()

    function onHandleChange({ target }) {
        let { value, name: field } = target

        if (field === 'price') {
            setBookToAdd((prevBook) => ({ ...prevBook, listPrice: { ...bookToAdd.listPrice, amount: +value } }))
        } else {
            setBookToAdd((prevBook) => ({ ...prevBook, [field]: value }))
        }
    }


    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToAdd)
            .then(() => {
                showSuccessMsg('Book added successfully')
                setBookToAdd(bookService.getEmptyBook())
            })
            .catch(err => {
                console.log('Error:', err)
                showErrorMsg('Cannot add book')
            })
            .finally(() => navigate('/book'))
    }

    const { title, listPrice, authors } = bookToAdd

    return (
        <section className="book-add">
            <h2>Add Book</h2>

            <section className="book-add-google">
                <h3>Add book from Google</h3>
                <AddGoogleBook />
            </section>

            <section className="book-add-storage">
                <h3>Add your book</h3>
                <form onSubmit={onSaveBook}>
                    <section>
                        <div className='book-title'>Book Title:</div>
                        <input name="title" value={title} onChange={onHandleChange} type="text" id="title" />
                    </section>

                    <section>
                        <div className='book-authors'>Book Authors:</div>
                        <input name="authors" value={authors} onChange={onHandleChange} type="text" id="authors" />
                    </section>

                    <section>
                            <div className="book-price">Book Price:</div>
                            <input name="price" value={listPrice.amount || ''} onChange={onHandleChange} type="number" id="price" />
                    </section>

                    <div className='book-add-actions-container'>
                        <button className='save-edit-btn' type="submit">Save ✔</button>
                        <button><Link to="/book" className='cancel-edit-btn'>Cancel ✖</Link></button>
                    </div>
                </form>
            </section>
        </section>
    )
}

