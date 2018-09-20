import InventoryBackendAPI from '../AppSettings';
import axios from 'axios';


const postRequestToBackend = async (uri, data) => {
    try{

        const response = await axios.post(uri, data);

        

    }catch(error) {
        console.log(error);
    }
}