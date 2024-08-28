import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product', error);
        throw error;
    }
};
