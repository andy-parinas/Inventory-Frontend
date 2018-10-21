import React, {Component} from 'react';


class EditableTableCell extends Component {

    state={
        inputValue: '',
        isDirty: false
    }


    componentDidMount(){
        this.setState({
            ...this.state,
            inputValue: this.props.value
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        
        if(prevState.inputValue !== nextProps.value && !prevState.isDirty){
            return{
                ...prevState,
                inputValue: nextProps.value
            }
        }

        return null;
    }

    inputChangeHandler = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            inputValue: value,
            isDirty: true
        })
    }

    updateHandler = () => {

        if(this.state.isDirty) {
            this.props.onUpdate(this.props.column.value, this.state.inputValue);
            this.setState({
                ...this.state,
                isDirty: false
            })
        }
    }

    render() {

        let cell = '';

        if(this.props.inputType === 'text'){
            cell = <input
                     name={this.props.column.value}
                     className='app-table-input' 
                     type='text' 
                     value={this.state.inputValue} 
                     onChange={this.inputChangeHandler} onBlur={this.updateHandler} />
         }
 
         if(this.props.inputType === 'select'){
            const options = this.props.column.options.map(option => {
                return <option key={option.id} value={option.id} >{ option.name }</option>
            })
        
            cell =  <select className='app-table-select'
                            name={this.props.column.value}
                            value={this.state.inputValue} 
                            onChange={this.inputChangeHandler} 
                            onBlur={this.updateHandler} >
                        {options}
                    </select>
         }

        return <td className='app-table-editable__data'> { cell } </td>
    }
}

export default EditableTableCell;