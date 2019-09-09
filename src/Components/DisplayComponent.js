import React from 'react'

export default function DisplayComponent(props) {
    return (
        <div> 
            <ul>
            {props.paginatedData.map((item) => {
                return (
                    <li key={item.id}>{item.title}</li> 
                )
            })}
            </ul>
        </div>
    )
}
