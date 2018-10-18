import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadLocations} from '../../../../store/actions';
import EditableTable from '../../../../components/TableComponent/EditableTable/EditableTable';

const columns = [
    {name: 'Location', value:'name', sortable: true, inputType: 'text'},
    {name: 'Address', value:'address', sortable: true, inputType: 'text'},
    {name: 'Phone', value:'phone', sortable: true, inputType: 'text'},
    {name: 'Location Type', value:'locationTypeId', sortable: true, inputType: 'select'}
];

class InventoryLocation extends Component {


    componentDidMount(){
        this.props.onLoadLocations();
    }

    updateLocationHandler = (id, property, value) => {
        console.log(id, property, value)
    }

    render(){
        return(
            <div className='app-container'>
                <div className='app-row' >
                    <EditableTable 
                        columns={columns} 
                        data={this.props.locations} 
                        onUpdate={this.updateLocationHandler} />
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {

    return {
        locations: state.locations.locations
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onLoadLocations: () => dispatch(loadLocations())
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(InventoryLocation);