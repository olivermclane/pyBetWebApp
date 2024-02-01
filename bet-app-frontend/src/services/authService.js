import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/bet/login/', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (username, password) => {
    try{
        const response = await axios.post('/bet/register/', { username, password });
        return response.data;
    }catch(error){
        throw error;
    }
};
