import React, {Component} from 'react';

class EditableTableRow extends Component {

    state={}

    componentDidMount(){

        this.props.columns.map(column => {
            this.setState({
                ...this.state,
                id: this.props.data.id,
                [column.value]: this.props.data[column.value]
            })
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        
        if(prevState.id !== nextProps.data.id){

            let updatedState = {
                ...prevState,
                id: nextProps.data.id
            };

            nextProps.columns.map(column => {
                updatedState = {
                    ...updatedState,
                    [column.value]: nextProps.data[column.value]
                }
            })
            return{
                ...updatedState
            }
        }

        return null;
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        })
    }


    render(){

        const cells = this.props.columns.map((column, i) => {

            let cell = '';

            if(column.inputType === 'text'){
                cell = <input
                         name={column.value}
                         className='app-table-input' 
                         type='text' 
                         value={this.state[column.value]} 
                         onChange={this.inputChangeHandler} />
             }
     
             if(column.inputType === 'select'){
                const options = column.options.map(option => {
                    return <option key={option.id} value={option.id} >{ option.name }</option>
                })
            
                cell =  <select className='app-table-select'
                                name={column.value}
                                value={this.state[column.value]} 
                                onChange={this.inputChangeHandler} >
                            {options}
                        </select>
             }

             if(column.inputType === 'actions'){
                 cell = <div className='app-table-control' >
                            <button className='app-table-btn app-table-btn--primary'> Update </button>
                            <button className='app-table-btn app-table-btn--danger'> Delete </button>
                        </div>
             }
    
            return <td className='app-table-editable__data'> { cell } </td>



        })



        return <tr className='app-table-editable__row' > {cells} </tr>
    }


}

export default EditableTableRow;