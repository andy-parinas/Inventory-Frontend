
export const initialInventoryForm =  {
    product: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Product',
            name: 'product',
            placeholder: 'Enter Product Name',
            list: 'product',
            disabled: true
        },
        uriSegment: 'products',
        searchFor: 'name',
        options: [],
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: true,
            withInOptions: true
        }
    },
    quantity: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Quantity',
            name: 'quantity',
            placeholder: '0.0',
            disabled: true
        },
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: false
        }
    },
    sku: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'SKU',
            name: 'sku',
            placeholder: 'Enter SKU',
            disabled: true
        },
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: true
        }
    },
    status: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Status',
            name: 'status',
            placeholder: 'Enter Status',
            disabled: true
        },
        uriSegment: 'inventories/statuses',
        options: [],
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: true
        }
    },
    thresholdWarning: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Threshold Warning',
            name: 'thresholdWarning',
            placeholder: 'Enter Threshold Warning',
            disabled:true
        },
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: true,
            numbersOnly: true
        }
    },
    thresholdCritical: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Threshold Critical',
            name: 'thresholdCritical',
            placeholder: 'Enter Threshold Critical',
            disabled: true
        },
        isValid: false,
        touched: false,
        errorMessages: [],
        validations: {
            required: true,
            numbersOnly: true
        }
    },
    location: {
        value: '',
        elementConfig : {
            type: 'text',
            title: 'Location',
            name: 'location',
            placeholder: 'Enter Location',
            disabled: true,
            list: 'location'
        },
        uriSegment: 'locations',
        searchFor: 'name',
        options: [],
        isValid: false,
        touched: false,
        errorMessage: [],
        validations: {
            required: true,
            withInOptions: true
        }
    }
}
