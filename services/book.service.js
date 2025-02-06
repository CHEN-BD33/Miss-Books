import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'BookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.vendor) {
                const regExp = new RegExp(filterBy.vendor, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(book => book.speed >= filterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '' , price = '' ,currencyCode) {
    return {
        title,
        listPrice:
        {
            amount: price,
            currencyCode,
            isOnSale: false
        }
    }
}

function getDefaultFilter() {
    return { title: '', Price: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('metus hendrerit', 109, 'EUR'),
            _createBook('morbi', 44, 'EUR'),
            _createBook('suat viverra venenatis', 108, 'ILS'),
        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price ,currencyCode) {
    const book = getEmptyBook(title, price ,currencyCode)
    book.id = utilService.makeId()
    return book
}