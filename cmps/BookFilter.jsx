
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target

        if (type === 'number') value = +value
        setfilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()

        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="Book-filter">
            <h2>Filter Our Books</h2>

            <form onSubmit={onSubmitForm}>
                <label htmlFor="title">Title</label>
                <input name="title" value={filterByToEdit.title} onChange={onHandleChange} type="text" id="title" />

                <label htmlFor="price">Price</label>
                <input name="price" value={filterByToEdit.price || ''} onChange={onHandleChange} type="number" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}
