import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState } = React

export function AddReview({ bookId, onAddReview }) {

    const [reviewToEdit, setReviewToEdit] = useState({
        fullname: '',
        rating: '5',
        readAt: new Date().toISOString().slice(0, 10),
    })

    function handleChange({ target }) {

        const field = target.name
        let value = target.value

        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }
    function onSubmitReview(ev) {
        ev.preventDefault()

        const review = { ...reviewToEdit, id: utilService.makeId() }

        bookService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg('Review added successfully')
                onAddReview(review)
                setReviewToEdit({
                    fullname: '',
                    rating: '5',
                    readAt: new Date().toISOString().slice(0, 10),
                })
                    .catch(err => {
                        showErrorMsg('Review faild to add')
                    })
            })

    }

    return (
        <form onSubmit={onSubmitReview}>
            <h2>Write a Review!</h2>
            <section>
                <div className='review-fullname'>FullName:</div>
                <input type='text' name='fullname' value={reviewToEdit.fullname} onChange={handleChange} />

                <div className='review-rating'>Rate</div>
                <select name="rating" value={reviewToEdit.rating} onChange={handleChange}>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>

                <div className='review-readAt'>Enter reading date</div>
                <input type='date' name='readAt' value={reviewToEdit.readAt} onChange={handleChange} />
            </section>

            <button className="review-add">Add Review</button>
        </form>
    )

}