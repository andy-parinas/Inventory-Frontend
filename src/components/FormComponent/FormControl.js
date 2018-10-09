import React from 'react';


const FormControl = props => {

    const renderSaveCancelButton = () => (
        <div className='app-page__control'>
            <div className='app-group' >
                <button type='button' className='app-btn' name='save'
                        onClick={props.onSaved}>Save</button>
                <button type='button' className='app-btn' name='cancelEdit'
                        onClick={props.onEditCancelled}>Cancel</button>
            </div>
        </div>
    )

    const renderEditDeleteButton = () => (
        <div className='app-page__control'>
                <div className='control-group control-group--col2 control-group--right'>
                    <button typeof='button' className='app-btn' name='edit'
                            onClick={props.onEdit} >Edit</button>
                    <button type='button' className='app-btn' name='delete'
                            onClick={props.onDelete} >Delete</button>
                </div>
          </div>
    )

    const renderDeleteCofirmButton = () => (
        <div className='app-page__control'>
            <div className='control-group'>
                <span> Confirm Delete? </span>
                <button type='button' className='app-btn' 
                   onClick={props.onDeleteConfirmed} >Yes</button>

                <button type='button' className='app-btn'
                    onClick={props.onDeleteCancelled}    >No</button>
            </div>
        </div>
    )

    return  props.action === 'new' || props.action === 'edit' ? renderSaveCancelButton() : 
    props.action === 'delete'? renderDeleteCofirmButton() : 
    renderEditDeleteButton() 

}

export default FormControl;