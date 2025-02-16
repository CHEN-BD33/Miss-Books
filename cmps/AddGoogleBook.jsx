import { GoogleBooksList } from '../cmps/GoogleBooksList.jsx'

import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js"

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function AddGoogleBook() {
    const [search, setSearch] = useState('')
    const [googleBookList, setGoogleBooksList] = useState([])

    const navigate = useNavigate()
    const searchBooksDebounce = useRef(utilService.debounce(searchBooks, 1500))

    useEffect(() => {
        searchBooksDebounce.current(search)
    }, [search])


    function handleChange({ target }) {
        setSearch(target.value)
    }

    function searchBooks(search) {
        bookService.getGoogleBooks(search)
            .then(books => setGoogleBooksList(books))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()

        searchBooks(search)
    }

    function onSaveBook(book) {
        bookService.addGoogleBook(book)
            .then(() => {
                showSuccessMsg('Book added successfully')
            })
            .catch(err => {
                console.log('Error:', err)
                showErrorMsg('Cannot add book')
            })
            .finally(() => navigate('/book'))
    }

    return (
        <div className='book-search'>
            <div className='search-book-title'></div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="add-book" className='bold-txt'>Google Search: </label>
                <input value={search} onChange={handleChange} type="text" name='title' placeholder='Insert book name' id="add-book" />
                <button>Search</button>
                {googleBookList && <GoogleBooksList booksList={googleBookList} onSaveBook={onSaveBook} />}
            </form>
        </div>
    )
}
