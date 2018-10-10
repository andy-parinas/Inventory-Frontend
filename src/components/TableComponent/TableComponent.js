import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SortAmountAsc from '../UI/Icons/SortAmountAsc';
import SortAmountDesc from '../UI/Icons/SortAmountDesc';

const TableCell = (props) => {

    const cells = props.columns.map((column, i) => {
        if(column.value === 'actions'){
            
            return  <td className='app-table__data app-table__actions' key={i}> 
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}`, state: {action: 'details'}}} className='app-table__link'>View </Link> |
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}` , state: {action: 'edit'}} } className='app-table__link'>Edit </Link> |
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}`,  state: {action: 'delete'}}} className='app-table__link'>Delete </Link>
                    </td>
        }else {

            let columnData = '';

            if(column.shorten && props.data[column.value].length > 60){
                columnData = props.data[column.value].slice(0, 60) + '...';
            }else {
                columnData = props.data[column.value];
            }

            return <td className='app-table__data' key={i}> { columnData } </td>
        }
    })

    return  cells;
}


const TableData = (props) => {

    const rows = props.data.map((row, i) => {
        return  <tr className='app-table__row' key={i} >
                    <TableCell columns={props.columns} data={row} match={props.match} />
                </tr>
    })

    return(
        <tbody className='app-table__body' >
            {rows}
        </tbody>
    )
}


const TableHeader = (props) => {

    let sortIcon = ''

    if(props.sort) {
        if(props.sort.asc){
            sortIcon = <SortAmountAsc className='app-table__icon' />
        }else {
            sortIcon = <SortAmountDesc className='app-table__icon' />
        }
    }

    // const sort = <span className='app-table__sort'>{ sortIcon }</span>

    const columns = props.columns.map(column => {
        return  <th className='app-table__header' key={Math.random()}>
                    <div className='app-table__header-title' onClick={() => props.onSort(column.value)} >
                        <span className='app-table__header-text'>{ column.name }</span>
                        { props.sort? props.sort.column === column.value? sortIcon : '' : ''}
                    </div>
                </th>
    })

    return(
        <thead className='app-table__head'>
            <tr className='app-table__row'>
                { columns }
            </tr>
        </thead>
    )
}

class TableComponent extends Component {

    render() {
        
        return(
            <table className='app-table app-table--bordered'>
                <TableHeader columns={this.props.columns} sort={this.props.sort} onSort={this.props.onSort} />
                <TableData columns={this.props.columns} data={this.props.data} match={this.props.match} />
            </table>
        )
    }

}

export default TableComponent;