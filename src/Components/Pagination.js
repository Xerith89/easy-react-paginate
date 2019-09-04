import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            totalRecords: 0,
            paginatedData: [],
            finalPage: 0
        }
      
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data) {
          this.setState({
            paginatedData: this.props.data.slice(this.currentPage-1,this.props.recordsPerPage), 
            totalRecords:this.props.data.length,
            currentPage: 1,
            finalPage: Math.ceil(this.props.data.length/this.props.recordsPerPage)
        });
        }
      }


    handleClick = (event) => {

        const {recordsPerPage, data} = this.props;
        if (event.currentTarget.name === 'nextPage') {
            this.setState({
                currentPage: this.state.currentPage+1,
                paginatedData: data.slice(this.state.currentPage*recordsPerPage,(this.state.currentPage*recordsPerPage)+recordsPerPage),
            });
        } else if (event.currentTarget.name === 'previousPage') {
            const offset = (this.state.currentPage-2)*recordsPerPage
            this.setState({
                currentPage: this.state.currentPage - 1,
                paginatedData: data.slice(offset,offset+recordsPerPage),
            });
        }
        else {
            const page = parseInt(event.target.value);
            const offset = (page*recordsPerPage)-recordsPerPage;
            this.setState({
                currentPage: page,
                paginatedData: data.slice(offset,offset+recordsPerPage),
            });
        }
    }


    render() {

        let pages = [];
        let pagebutton;
        for(let i = 1; i <= this.state.finalPage; i++) {
            pages.push(i);
        }
        return (
            <div> 
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                        {this.state.currentPage === 1 ? <button id="previousPage" name="previousPage" onClick={this.handleClick} className="btn disabled" aria-label="Previous" disabled><span aria-hidden="true"><FontAwesomeIcon icon={faChevronLeft} /></span></button> :
                        <button name="previousPage" onClick={this.handleClick} style={{border: '0', background: 'none'}} className="page-link" href="/" aria-label="Previous"><span aria-hidden="true"><FontAwesomeIcon icon={faChevronLeft} /></span></button>} 
                        </li>
            
                            {pages.map((value) => {
                            value !== this.state.currentPage ? pagebutton = <li key={value} className="page-item"><button name={`value${value}`} style={{border: '0', background: 'none'}} className="page-link" value={value} onClick={this.handleClick}>{value}
                            </button></li> : pagebutton = <li key={value} className="page-item"><button className="btn disabled" value={value} onClick={this.handleClick} disabled><strong>{value}</strong></button></li>
                            return (pagebutton)
                        })}
                        
                        {this.state.currentPage !== this.state.finalPage ? <button id="nextPage"style={{border: '0',  background: 'none'}}  name="nextPage" onClick={this.handleClick}className="page-link" aria-label="Next">
                            <span aria-hidden="true"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </button> : <button name="nextPage" onClick={this.handleClick}className="btn disabled" aria-label="Next" disabled>
                            <span aria-hidden="true"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </button>}
                        
                    </ul>
                </nav>
            </div>
        )
    }
}

Pagination.propTypes = {
    data: PropTypes.array,
    recordsPerPage: PropTypes.number
}