import axios from 'axios';
import { API_URL } from './utils';

export const Createtask = async (taskObj) => {
    // console.log(taskObj);return;
    const url = `${API_URL}/task`;
    // console.log('API URL:', url);

    try {
        const response = await axios.post(url, taskObj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        // console.error('Error saving data:', error);
        throw error;
    }
};


export const GetAllTask = async () => {
    const url = `${API_URL}/task`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/task/${id}`;
    // console.log(url);
    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}


export const UpdateTaskById = async (id,reqBody) => {
    const url = `${API_URL}/task/${id}`;
    console.log(url);
    try {
        const response = await axios.put(url,reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}