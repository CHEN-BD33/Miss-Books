import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { books } from './books.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    // getEmptyBook,
    getDefaultFilter,
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// function getEmptyBook() {
//     return {
//         title: '',
//         subtitle: '', 
//         authors: [], 
//         publishedDate: null,
//         description: '',
//         pageCount: 0,
//         categories: [],
//         thumbnail: '',
//         language: '',
//         listPrice:
//         {
//             amount: 0,
//             currencyCode: 'ILS',
//             isOnSale: false
//         }
//     }
// }

function getDefaultFilter() {
    return { title: '', price: '' }
}

function _createBooks() {
    let booksFromStorage = utilService.loadFromStorage(BOOK_KEY)
    if (!booksFromStorage || !booksFromStorage.length) {
        
        //     _createBook('metus hendrerit', 109),
        //     _createBook('morbi', 44),
        //     _createBook('suat viverra venenatis', 108),
        // ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

// function _createBook(title, price) {
//     const book = getEmptyBook(title, price)
//     book.id = utilService.makeId()
//     return book
// }