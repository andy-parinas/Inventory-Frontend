import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadLocations, loadLocationTypes, createLocation, updateLocation, deleteLocation} from '../../../../store/actions';
import EditableTable from '../../../../components/TableComponent/EditableTable/EditableTable';
import LocationSearchControl from './LocationSearchControl';
import TablePageControl from '../../../../components/TableComponent/TablePageControl';


class InventoryLocation extends Component {

    state = {
        sort: {
            column: 'name',
            asc: true
        },
        filter: {}
    }

    componentDidMount(){

        if(this.props.locations.length === 0){
            this.props.onLoadLocations();
        }
        
        if(this.props.locationTypes.length === 0 ){
            this.props.onLoadLocationTypes();
        }
        
    }

    updateLocationHandler = (id, location) => {
        this.props.onUpdateLocation(id, location)
    }

    createLocationHandler = (location, callback) => {
        this.props.onCreateLocation(location, callback);
    }

    deleteLocationHandler = (id) => {
        this.props.onDeleteLocation(id)
    }

    pageChangedHandler = (pageNumber: number = 1) => {
        if(pageNumber >= 1 && pageNumber <= this.props.pagination.totalPages){
            this.props.onLoadLocations(pageNumber, this.state.sort, null, null);
        }
    }

    locationSortedHandler = (columnName) => {
        const sort = {
            column: columnName,
            asc: columnName === this.state.sort.column? !this.state.sort.asc : true
        }

        const pageNumber = this.props.pagination.pageNumber

        this.props.onLoadLocations(pageNumber, sort, this.state.filter, () => {
            this.setState(prevState => {
                return {
                    ...this.state,
                   sort: {
                    ...sort
                   }
                }
            })
        })

    }

    locationSearchHandler = (filter) => {
        this.props.onLoadLocations(1, this.state.sort, filter, () => {
            this.setState(prevState => {
                return {
                    ...this.state,
                   filter: {
                    ...filter
                   }
                }
            })
        })
    }


    render(){

        // console.log(this.props.locations)
        const columns = [
            {name: 'Location', value:'name', sortable: true, inputType: 'text'},
            {name: 'Address', value:'address', sortable: true, inputType: 'text'},
            {name: 'Phone', value:'phone', sortable: true, inputType: 'text'},
            {name: 'Location Type', value:'locationTypeId', sortable: true, inputType: 'select', options: this.props.locationTypes},
            {name: '', value:'actions', inputType:'actions' }
        ];

        const pagination = this.props.pagination? <TablePageControl pagination={this.props.pagination} onPageChanged={this.pageChangedHandler} /> : ''

        return(
            <div className='app-container'>
                <div className='app-row' >
                    <h2>Inventory Locations</h2>
                    <hr />
                    <LocationSearchControl onSearch={this.locationSearchHandler} />
                    <EditableTable 
                        columns={columns} 
                        data={this.props.locations} 
                        sort={this.state.sort}
                        onSort={this.locationSortedHandler}
                        onUpdate={this.updateLocationHandler} onDelete={this.deleteLocationHandler}
                        onAdd={this.createLocationHandler} />
                </div>
                { pagination }
            </div>
        )
    }

}


const mapStateToProps = state => {

    return {
        locations: state.locations.locations,
        locationTypes: state.locations.locationTypes,
        pagination: state.locations.pagination
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onLoadLocations: (pageNumber, sort, filter, callback) => dispatch(loadLocations(pageNumber, sort, filter, callback)),
        onLoadLocationTypes: () => dispatch(loadLocationTypes()),
        onCreateLocation: (location, callback) => dispatch(createLocation(location, callback)),
        onUpdateLocation: (id, location, callback) => dispatch(updateLocation(id, location, callback)),
        onDeleteLocation: (id, callback) => dispatch(deleteLocation(id, callback))
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(InventoryLocation);