import React, {Component} from 'react';


class NewEntryRow extends Component {

    state = {}

    componentDidMount(){
        this.props.columns.map(column => {
            if(column.inputType !== 'actions'){

                if(column.inputType === 'select'){
                     this.setState({
                        ...this.state,
                        [column.value]: column.options.length > 0 ? column.options[0].id : 0
                    })
                }else {
                    this.setState({
                        ...this.state,
                        [column.value]: ''
                    })

                }
               
            }
        })
    }


    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        })

    }

    addHandler = () => {
        this.props.onAdd(this.state, () => {
            this.props.columns.map(column => {
                if(column.inputType !== 'actions'){
                    this.setState({
                        ...this.state,
                        [column.value]: ''
                    })
                }
            })
        });
    }

    render(){

        const newRow = this.props.columns.map((column, i) => {

            let cell = '';

            if(column.inputType === 'text'){
                cell = <input
                         name={column.value}
                         className='app-table-input app-table-input--visible' 
                         type='text' 
                         value={this.state[column.value] ? this.state[column.value] : '' } 
                         onChange={this.inputChangeHandler} />
             }
     
             if(column.inputType === 'select'){
                const options = column.options.map(option => {
                    return <option key={option.id} value={option.id} >{ option.name }</option>
                })
            
                cell =  <select className='app-table-select app-table-select--visible'
                                name={column.value}
                                value={this.state[column.value]} 
                                onChange={this.inputChangeHandler}  >
                            <option value={0} > </option>
                            {options}
                        </select>
             }

             if(column.inputType === 'actions'){
                cell = <div className='app-table-control' >
                           <button className='app-table-btn app-table-btn--primary' 
                                    onClick={this.addHandler} > Add New </button>
                           {/* <button className='app-table-btn app-table-btn--danger'> Clear </button> */}
                       </div>
            }

             return <td key={i} className='app-table-editable__data'> {cell} </td>

        })

        


        return <tr className='app-table-editable__row'>{newRow}</tr>
    }


}

export default NewEntryRow;