import React, {Component, PureComponent} from 'react';
import {SortAmountAsc, SortAmountDesc} from '../../../components/UI/Icons';
import EditableTableCell from './EditableTableCell';
import NewEntryRow from './NewEntryRow';
import EditableTableRow from './EditableTableRow';

class TableCell extends Component {

    updateHandler = (property, value) => {

        this.props.onUpdate(this.props.data.id, property, value);
    }

    render(){

        const cells = this.props.columns.map((column, i) => {

            return <EditableTableCell key={i}
                        column={column}
                        value={this.props.data[column.value]} 
                        inputType={column.inputType} onUpdate={this.updateHandler} />
        })

        return  cells;

    }

}


const TableData = (props) => {

    const rows = props.data.map((row,i) => {

        // return  <tr className='app-table-editable__row' key={i} >
        //             <TableCell 
        //                 columns={props.columns} 
        //                 data={row} onUpdate={props.onUpdate} />
        //         </tr>

        return <EditableTableRow columns={props.columns} data={row} />
    })


    return(
        <tbody className='app-table-editable__body' >
            {rows}
            <NewEntryRow columns={props.columns} />
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
                <div className='app-table-editable__header-title'  onClick={() => props.onSort(column.value)} >
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

    // state = {
    //     data: []
    // }

    
    // static getDerivedStateFromProps(nextProps, prevState){

    //     if(prevState.data.length === 0 || prevState.data[1].id !== nextProps.data[1].id){

    //         return {
    //             ...prevState,
    //             data: nextProps.data
    //         }

    //     }

    //     return null;
    // }

    // addLocationHandler = (location) => {
    //   this.setState(prevState => {

    //     return {
    //         ...prevState,
    //         data: [...prevState.data, location]
    //     }
    //   })
    // }

  
    render(){

        const rows = this.props.data.map((row,i) => {
            return <EditableTableRow key={i} columns={this.props.columns} data={row} />
        })



        return(
            <table className='app-table-editable'>
                <TableHeader columns={this.props.columns} sort={this.props.sort} onSort={this.props.onSort} />
                {/* <TableData 
                    columns={this.props.columns} 
                    data={this.props.data} onUpdate={this.props.onUpdate} /> */}
                 <tbody className='app-table-editable__body' >
                    {rows}
                    <NewEntryRow columns={this.props.columns} onAdd={this.props.onAdd} />
                </tbody>
            </table>
        )
    }



}

export default EditableTable;