import React from 'react'

const Form = ({fields, refresh}) => {
    const form_field = ({name, value, increment, decrement}, key) => (
        <div key={key} style={{display: 'flex', justifyContent: 'space-between'}}>
            {name}
            <div>
                <button style={{margin: '0 5px'}} onClick={decrement}>-</button>
                <span style={{display: 'inline-block', minWidth: '1rem'}}>{value}</span>
                <button style={{margin: '0 5px'}} onClick={increment}>+</button>
            </div>
        </div>
    )
    return (
        <div>
            {fields.map(form_field)}
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}

export default Form