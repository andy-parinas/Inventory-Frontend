import React, {Component} from 'react';
import TableComponent from '../../../../components/TableComponent/TableComponent';

const columns = [
    {name: 'Products', value:'product'},
    {name: 'Quantity', value:'quantity'},
    {name: 'Status', value:'status'},
    {name: 'Location', value:'location'},
    {name: '', value:'actions', link:'inventories' }
];

class InventoryTable extends Component {

    render(){
        // console.log(this.props.data);
        return(
            <div className='app-row' >
                <TableComponent columns={columns} data={this.props.data} />
            </div>
        )
    }
}


export default InventoryTable;