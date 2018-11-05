import axios from 'axios';

import {SHOW_MESSAGES, 
        LOAD_PRODUCTS, 
        HIDE_LOADING, 
        SHOW_LOADING, 
        LOAD_PRODUCT, 
        UPDATE_PRODUCT, 
        DELETE_PRODUCT, 
        CREATE_PRODUCT, 
        LOAD_PRODUCT_CATEGORIES,
        CREATE_PRODUCT_CATEGORY,
        UPDATE_PRODUCT_CATEGORY,
        DELETE_PRODUCT_CATEGORY,
        } from './actionTypes';

import {InventoryBackendAPI} from '../../AppSettings';
import {convertFormToObject} from '../../helpers/helpers';


export const loadProducts = (pageNumber: number = 1, sort, callback) => async dispatch => {

    try {
        dispatch({
            type: SHOW_LOADING
        })

        let uri = `${InventoryBackendAPI}/products?pageNumber=${pageNumber}`;

        
        if(sort){
            if(sort.asc){
                uri = uri + `&orderBy=${sort.column}&direction=ASC`
            }else{
                uri = uri + `&orderBy=${sort.column}&direction=DESC`
            }           
        }

        const response = await axios.get(uri);

        dispatch({
            type: LOAD_PRODUCTS,
            products: response.data,
            pagination: JSON.parse(response.headers.pagination)
        })

        if(callback){
            callback();
        }

        dispatch({
            type: HIDE_LOADING
        })

    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Loading Products']
        })

        dispatch({
            type: HIDE_LOADING
        })
    }


}


export const loadProduct = (productId) => async dispatch => {

    try{
        dispatch({
            type: SHOW_LOADING
        });

        const uri = `${InventoryBackendAPI}/products/${productId}`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_PRODUCT,
            product: response.data
        });

        dispatch({
            type: HIDE_LOADING
        });


    }catch(error) {

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Loading Product']
        })

        console.log(error.response);

        dispatch({
            type: HIDE_LOADING
        });

    }


}

export const updateProduct = (productId, productForm, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        });

        const uri = `${InventoryBackendAPI}/products/${productId}`;

        const product = {
            product: '',
            upc: '',
            descriptions: '',
            cost: '',
            price: '',
            category: ''
        }


        convertFormToObject(productForm, product);

        const response = await axios.put(uri, product);


        dispatch({
            type: UPDATE_PRODUCT,
            product: response.data
        })

        callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly updated product']
        });

        dispatch({
            type: HIDE_LOADING
        });


    }catch(error){

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['Error Updating Product']
        })

        console.log(error.response);

        dispatch({
            type: HIDE_LOADING
        });

    }
}

export const createProduct = (productForm, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        });

        const newProduct = {
            product: '',
            upc: '',
            descriptions: '',
            cost: '',
            price: '',
            category: ''
        }

        convertFormToObject(productForm, newProduct);

        const uri = `${InventoryBackendAPI}/products`;
        const response = await axios.post(uri, newProduct);

        dispatch({
            type: CREATE_PRODUCT,
            product: response.data
        })

        callback(response.data.id);

        dispatch({
            type: HIDE_LOADING
        })

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly created product']
        });


    }catch(error){

        
        dispatch({
            type: HIDE_LOADING
        })

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'error',
            messages: ['error creating product']
        });

        console.log(error.response);
    }
}

export const deleteProduct = (productId, callback) => async dispatch => {

    try{

        dispatch({
            type: SHOW_LOADING
        });


        const uri = `${InventoryBackendAPI}/products/${productId}`;
        
        await axios.delete(uri);

        dispatch({
            type: DELETE_PRODUCT
        })

        callback();


        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages: ['Successfuly deleted product']
        });

        dispatch({
            type: HIDE_LOADING
        });

    }catch(error){

        if(error.response && error.response.data && error.response.data.products){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.products
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Deleting Product']
            })

            console.log(error);
        }

       

        dispatch({
            type: HIDE_LOADING
        });

    }
}

export const loadProductCategories = () => async dispatch => {

    try{

        const uri = `${InventoryBackendAPI}/products/categories`;
        const response = await axios.get(uri);

        dispatch({
            type: LOAD_PRODUCT_CATEGORIES,
            categories: response.data
        })

    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Loading Product Categories']
            })

            console.log(error);
        }

    }
}

export const createProductCategory = (productCategory, callback) => async dispatch => {

    try {

        const uri = `${InventoryBackendAPI}/products/categories`;
        const response = await axios.post(uri, productCategory);

        dispatch({
            type: CREATE_PRODUCT_CATEGORY,
            category: response.data
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Product Category Successfully Created']
        })




    }catch(error) {
        
        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Creating Product Categories']
            })

            console.log(error);
        }


    }

}


export const updateProductCategory = (id, productCategory, callback) => async dispatch => {

    try {

        const uri = `${InventoryBackendAPI}/products/categories/${id}`;
        const response = await axios.put(uri, productCategory);

        dispatch({
            type: UPDATE_PRODUCT_CATEGORY,
            id: id,
            category: response.data
        })

        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Product Category Successfully Updated']
        })



    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Updating Product Categories']
            })

            console.log(error);
        }

    }

}

export const deleteProductCategory = (id, callback) => async dispatch => {

    try {
        
        const uri = `${InventoryBackendAPI}/products/categories/${id}`;
        const response = await axios.delete(uri);

 
        dispatch({
            type: DELETE_PRODUCT_CATEGORY,
            id: id
        })    

        
        if(callback) callback();

        dispatch({
            type: SHOW_MESSAGES,
            messageType: 'success',
            messages:  ['Product Category Successfully Deleted']
        })


    }catch(error){

        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  error.response.data.error
            })

        }else{
            dispatch({
                type: SHOW_MESSAGES,
                messageType: 'error',
                messages:  ['Error Updating Product Categories']
            })

            console.log(error);
        }


    }

}