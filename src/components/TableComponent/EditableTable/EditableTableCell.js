import React, {Component} from 'react';


class EditableTableCell extends Component {

    state={
        inputValue: ''
    }


    componentDidMount(){
        this.setState({
            ...this.state,
            inputValue: this.props.value
        })
    }

    inputChangeHandler = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            inputValue: value
        })
    }

    updateHandler = () => {
        this.props.onUpdate(this.props.name, this.state.inputValue);
    }

    render() {

        let cell = '';

        if(this.props.inputType === 'text'){
            cell = <input
                     name={this.props.name}
                     className='app-table-input' 
                     type='text' 
                     value={this.state.inputValue} 
                     onChange={this.inputChangeHandler} onBlur={this.updateHandler} />
         }
 
         if(this.props.inputType === 'select'){
 
         }

        return <td className='app-table-editable__data'> { cell } </td>
    }
}

export default EditableTableCell;