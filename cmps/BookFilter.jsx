
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    
    const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target

        if (type === 'number') value = +value || ''
        setfilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    // function onSubmitForm(ev) {
    //     ev.preventDefault()

    //     onSetFilterBy(filterByToEdit)
    // }

    return (
        <section className="Book-filter">
            <h2>Filter Our Books</h2>

            <div className="filter-container">
                <label htmlFor="title">Title</label>
                <input name="title" value={filterByToEdit.title} onChange={onHandleChange} type="text" id="title" />

                <label htmlFor="price">Price</label>
                <input name="price" value={filterByToEdit.price || ''} onChange={onHandleChange} type="number" id="price" />

                <label htmlFor="fromYear">Year From:</label>
                <input name="fromYear" value={filterByToEdit.fromYear || ''} onChange={onHandleChange} type="number" id="fromYear" />

                <label htmlFor="toYear">To:</label>
                <input name="toYear" value={filterByToEdit.toYear || ''} onChange={onHandleChange} type="number" id="toYear" />

                <label htmlFor="language">Language:</label>
            <select name="language" value={filterByToEdit.language} onChange={onHandleChange} id="language" >
                <option value="">All</option>
                <option value="en">English</option>
                <option value="he">Hebrew</option>
                <option value="sp">Spanish</option>
            </select>

            </div>

        </section>
    )
}
