import React, {Component} from 'react';
import {SortAmountAsc, SortAmountDesc} from '../../../components/UI/Icons';
import EditableTableCell from './EditableTableCell';

class TableCell extends Component {

    updateHandler = (property, value) => {
        this.props.onUpdate(this.props.data.id, property, value);
    }

    render(){

        const cells = this.props.columns.map((column, i) => {

            return <EditableTableCell key={i}
                        name={column.value} 
                        value={this.props.data[column.value]} 
                        inputType={column.inputType} onUpdate={this.updateHandler} />
        })

        return  cells;

    }

}


const TableData = (props) => {

    const rows = props.data.map((row,i) => {
        return  <tr className='app-table-editable__row' key={i} >
                    <TableCell 
                        columns={props.columns} 
                        data={row} onUpdate={props.onUpdate} />
                </tr>
    })

    return(
        <tbody className='app-table-editable__body' >
            {rows}
        </tbody>
    )

}

const TableHeader = (props) => {

    let sortIcon = ''

    if(props.sort) {
        if(props.sort.asc){
            sortIcon = <SortAmountAsc className='app-table-editable__icon' />
        }else {
            sortIcon = <SortAmountDesc className='app-table-editable__icon' />
        }
    }

    const columns = props.columns.map(column => {
        return  (
            <th className='app-table-editable__header' key={Math.random()}>
                <div className='app-table-editable__header-title'>
                    <span className='app-table-editable__header-text'>{ column.name }</span>
                    { props.sort? props.sort.column === column.value? sortIcon : '' : ''}
                </div>
            </th>
        )
    })

    return(
        <thead className='app-table-editable__head'>
            <tr className='app-table-editable__row'>
                { columns }
            </tr>
        </thead>
    )

}

class EditableTable extends Component {



    render(){

        return(
            <table className='app-table-editable'>
                <TableHeader columns={this.props.columns} />
                <TableData 
                    columns={this.props.columns} 
                    data={this.props.data} onUpdate={this.props.onUpdate} />
            </table>
        )
    }



}

export default EditableTable;