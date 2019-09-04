import React, { Component } from 'react'
import Pagination from './Pagination'

export default class BaseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then (json => {
            this.setState({
                data: json
            });
        })
        .catch(error => console.log(error)
        );
    }


    render() {
        return (
            <div className="container">
                <Pagination data={this.state.data} recordsPerPage={2} />
            </div>
        )
    }
}
