import React, {Component, Fragment} from 'react';
import axios from 'axios';

import FormInput from '../../../../components/FormComponent/FormInput';
import FormSelect from '../../../../components/FormComponent/FormSelect';
import {InventoryBackendAPI} from '../../../../AppSettings';
import FormTextArea from '../../../../components/FormComponent/FormTextArea';
import FormControl from '../../../../components/FormComponent/FormControl';
import {validateInput, getAuthHeader} from '../../../../helpers/helpers';

class ProductForm extends Component {


    state = {
        id: 0,
        updatedAt: '',
        categoryOptions: [],
        form: {
            product: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Product',
                    name: 'product',
                    placeholder: 'Enter Product Name',
                    list: 'product'
                },
                uriSegment: 'products',
                searchFor: 'name',
                options: [],
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            category: {
                value: 1,
                elementConfig : {
                    type: 'text',
                    title: 'Category',
                    name: 'category',
                    placeholder: 'Enter Product Category',
                    list: 'product'
                },
                uriSegment: 'products',
                searchFor: 'name',
                options: [],
                isValid: true,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
            upc: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'UPC',
                    name: 'upc',
                    placeholder: 'Enter Universal Product Code'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    withInOptions: true
                }
            },
            price: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Selling Price',
                    name: 'price',
                    placeholder: 'Enter Selling Price'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    numbersOnly: true
                }
            },
            cost: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Product Cost',
                    name: 'cost',
                    placeholder: 'Enter Product Cost'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true,
                    numbersOnly: true
                }
            },
            descriptions: {
                value: '',
                elementConfig : {
                    type: 'text',
                    title: 'Descriptions',
                    name: 'descriptions',
                    placeholder: 'Enter Product Descriptions'
                },
                isValid: false,
                touched: false,
                errorMessages: [],
                validations: {
                    required: true
                }
            },
        }
    }


    componentDidMount(){

        this.loadCategoryOptions();
    }

    static getDerivedStateFromProps(nextProps, prevState){
       if(nextProps.data){
            if(nextProps.reload || nextProps.data.id !== prevState.id || nextProps.data.updatedAt !== prevState.updatedAt){
                return {
                    ...prevState,
                    id: nextProps.data.id,
                    updatedAt: nextProps.data.updatedAt,
                    form: {
                        ...prevState.form,
                        product: {
                            ...prevState.form.product,
                            value: nextProps.data.name,
                            isValid: true,
                            errorMessages: []
                        },
                        category: {
                            ...prevState.form.category,
                            value: nextProps.data.productCategory.id,
                            isValid: true,
                            errorMessages: []
                        },
                        upc: {
                            ...prevState.form.upc,
                            value: nextProps.data.upc,
                            isValid: true,
                            errorMessages: []
                        },
                        descriptions: {
                            ...prevState.form.descriptions,
                            value: nextProps.data.descriptions,
                            isValid: true,
                            errorMessages: []
                        },
                        cost: {
                            ...prevState.form.cost,
                            value: nextProps.data.cost,
                            isValid: true,
                            errorMessages: []
                        },
                        price: {
                            ...prevState.form.price,
                            value: nextProps.data.price,
                            isValid: true,
                            errorMessages: []
                        }
                    }
                }
            }
       }

        return null;
    }

    async loadCategoryOptions() {
        try {
            const uri = `${InventoryBackendAPI}/products/categories`;
            const headers = getAuthHeader();

            const response = await axios.get(uri, {headers: headers});

            this.setState({
                ...this.state,
                categoryOptions: response.data
            })

        }catch(error){
            console.log(error.response);
        }
    }

    inputChangedHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const validationResult = validateInput(this.state.form[name].validations, value);

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: {
                    ...this.state.form[name],
                    value: value,
                    isValid: validationResult.isValid,
                    errorMessages: validationResult.messages,
                    touched: true
                }
            }
        })


    }


    render(){

        let disabled = true;

        if(this.props.action === 'edit' || this.props.action === 'new'){
            disabled = false;
        }

        return(
            <Fragment>
                <div className='app-form-container app-form-container--4rows' >
                <div className='app-form-row app-form-row--r1c1'>
                    <FormInput
                            onChange={this.inputChangedHandler}
                        value={this.state.form.product.value}
                        elementConfig={this.state.form.product.elementConfig}
                        disabled={disabled} 
                        isValid={this.state.form.product.isValid}
                        touched={this.state.form.product.touched}
                        errorMessages={this.state.form.product.errorMessages} />
                </div>

                <div className='app-form-row app-form-row--r1c2'>
                    <FormSelect
                            onChange={this.inputChangedHandler} 
                            value={this.state.form.category.value}
                            options={this.state.categoryOptions}
                            elementConfig={this.state.form.category.elementConfig} 
                            disabled={disabled} />
                </div>

                <div className='app-form-row app-form-row--r2c1'>
                    <FormInput
                            onChange={this.inputChangedHandler}
                            value={this.state.form.cost.value}
                            elementConfig={this.state.form.cost.elementConfig}
                            disabled={disabled}
                            isValid={this.state.form.cost.isValid}
                            touched={this.state.form.cost.touched}
                            errorMessages={this.state.form.cost.errorMessages}  />
                </div>
                <div className='app-form-row app-form-row--r2c2'>
                    <FormInput
                            onChange={this.inputChangedHandler}
                            value={this.state.form.price.value}
                            elementConfig={this.state.form.price.elementConfig}
                            disabled={disabled}
                            isValid={this.state.form.price.isValid}
                            touched={this.state.form.price.touched}
                            errorMessages={this.state.form.price.errorMessages}  />
                </div>
                <div className='app-form-row app-form-row--r3c1'>
                    <FormInput
                            onChange={this.inputChangedHandler}
                            value={this.state.form.upc.value}
                            elementConfig={this.state.form.upc.elementConfig}
                            disabled={disabled}
                            isValid={this.state.form.upc.isValid}
                            touched={this.state.form.upc.touched}
                            errorMessages={this.state.form.upc.errorMessages}  />
                </div>
                <div className='app-form-row app-form-row--2r3c2'>
                    <FormTextArea
                            onChange={this.inputChangedHandler}   
                            value={this.state.form.descriptions.value}
                            elementConfig={this.state.form.descriptions.elementConfig}
                            disabled={disabled}
                            isValid={this.state.form.descriptions.isValid}
                            touched={this.state.form.descriptions.touched}
                            errorMessages={this.state.form.descriptions.errorMessages} />

                </div>
            
            </div>
                <FormControl 
                    action={this.props.action} 
                    onEdit={this.props.onEdit} 
                    onSaved={() => this.props.onSaved(this.state.form)} 
                    onDelete={this.props.onDelete}
                    onEditCancelled={this.props.onEditCancelled} 
                    onDeleteCancelled={this.props.onDeleteCancelled} 
                    onDeleteConfirmed={this.props.onDeleteConfirmed} />
            </Fragment>
        )
    }


}

export default ProductForm;