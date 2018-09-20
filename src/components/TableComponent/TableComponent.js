import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const TableCell = (props) => {

    const cells = props.columns.map((column, i) => {
        if(column.value === 'actions'){
            
            return  <td className='app-table__data app-table__actions' key={i}> 
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}`, state: {action: 'show'}}} className='app-table__link'>View </Link> |
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}` , state: {action: 'edit'}} } className='app-table__link'>Edit </Link> |
                        <Link to={{pathname: `${props.match.url}/${props.data['id']}`,  state: {action: 'delete'}}} className='app-table__link'>Delete </Link>
                    </td>
        }else {
            return <td className='app-table__data' key={i}> {props.data[column.value]} </td>
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

    const columns = props.columns.map(column => {
        return  <th className='app-table__header' key={Math.random()}>
                    { column.name }
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
                <TableHeader columns={this.props.columns} />
                <TableData columns={this.props.columns} data={this.props.data} match={this.props.match} />
            </table>
        )
    }

}

export default TableComponent;