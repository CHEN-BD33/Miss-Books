import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { books } from './books.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    removeReview,
    addGoogleBook,
    getGoogleBooks,
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
            if (filterBy.fromYear) {
                books = books.filter(book => book.publishedDate >= filterBy.fromYear)
            }
            if (filterBy.toYear) {
                books = books.filter(book => book.publishedDate <= filterBy.toYear)
            }
            if (filterBy.language) {
                books = books.filter(book => book.language === filterBy.language)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
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

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: null,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice:
        {
            amount: 0,
            currencyCode: 'ILS',
            isOnSale: false
        },
        reviews:
        {
            fullname: '',
            rating: '5',
            readAt: new Date().toISOString().slice(0, 10),
        }
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: '',
        fromYear: '',
        toYear: '',
        language: ''
    }
}

function _createBooks() {
    let booksFromStorage = utilService.loadFromStorage(BOOK_KEY)
    if (!booksFromStorage || !booksFromStorage.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []

        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

// function _createBook(title, price) {
//     const book = getEmptyBook(title, price)
//     book.id = utilService.makeId()
//     return book
// }

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return save(book)
        })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return save(book)
        })
}

function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}

function getGoogleBooks(bookName) { 
    if (bookName === '') return Promise.resolve()
        const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }
    
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
    .then(res => {
        const data = res.data.items
        console.log('data from network...', data)
        const books = _formatGoogleBooks(data)
        gCache[bookName] = books
        utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
        return books
    })
}


// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~


function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}